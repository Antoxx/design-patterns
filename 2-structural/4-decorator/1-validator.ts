import assert from "assert"

interface ValidationResult {
    value: any
    valid: boolean
    errors: string[]
}

interface Validator {
    validate (value: any): ValidationResult
}

class BaseValidator implements Validator {
    validate (value: any) {
        return { value, valid: true, errors: [] as string[] }
    }
}

class ValidatorDecorator extends BaseValidator {
    private validator: Validator

    constructor (validator: Validator) {
        super()
        this.validator = validator
    }

    validate (value: any) {
        return this.validator.validate(value)
    }
}

class StringValidator extends ValidatorDecorator {
    validate (value: any) {
        const result = super.validate(value)
        if (typeof result.value === 'string') {
            return result
        }

        return {
            value: result.value, 
            valid: false, 
            errors: result.errors.concat('Field is not a string'),
        }
    }
}

class RequiredValidator extends ValidatorDecorator {
    validate (value: any) {
        const result = super.validate(value)
        if (result.value) {
            return result
        }

        return {
            value: result.value, 
            valid: false, 
            errors: result.errors.concat('Field is required'),
        }
    }
}

class MinLengthValidator extends ValidatorDecorator {
    private minLength: number

    constructor (validator: Validator, minLength: number) {
        super(validator)
        this.minLength = minLength
    }

    validate (value: string) {
        const result = super.validate(value)

        if (result.value.length >= this.minLength) {
            return result
        }

        return {
            value: result.value, 
            valid: false, 
            errors: result.errors.concat(`Field value is less than ${this.minLength} symbols`),
        }
    }
}

class MobilePhoneValidator extends ValidatorDecorator {
    validate (value: string) {
        const result = super.validate(value)
        const phone = result.value
        const valid = /^(\+7|8)-\d{3}-\d{3}-\d{2}-\d{2}/.test(phone)

        if (valid) {
            return result
        }

        return {
            value: result.value, 
            valid, 
            errors: result.errors.concat('Field is not a mobile phone'),
        }
    }
}

assert.deepEqual(new StringValidator(new BaseValidator()).validate(123), {
    value: 123,
    valid: false,
    errors: ['Field is not a string']
})

assert.deepEqual(new StringValidator(new BaseValidator()).validate('123'), {
    value: '123',
    valid: true,
    errors: []
})

assert.deepEqual(new StringValidator(new BaseValidator()).validate('123'), {
    value: '123',
    valid: true,
    errors: []
})

assert.deepEqual(new MobilePhoneValidator(new RequiredValidator(new StringValidator(new BaseValidator()))).validate(''), {
    value: '',
    valid: false,
    errors: ['Field is required', 'Field is not a mobile phone']
})

assert.deepEqual(new MobilePhoneValidator(new StringValidator(new BaseValidator())).validate('+1-900-100-10-10'), {
    value: '+1-900-100-10-10',
    valid: false,
    errors: ['Field is not a mobile phone']
})

assert.deepEqual(new MinLengthValidator(new StringValidator(new BaseValidator()), 10).validate('12345'), {
    value: '12345',
    valid: false,
    errors: ['Field value is less than 10 symbols']
})

