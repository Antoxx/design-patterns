# Factory method

Provides a way to create objects without having to specify their exact classes.

## Pros

- Implements SRP in practice. If you need a new Product class, add a new Creator class.

## Cons

- This approach does not solve the if-switch problem in the code.
