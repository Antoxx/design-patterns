# Facade

Simplifies access to a complex system, providing a unified and clear interface, hiding and protecting internal complexity.

Facade is an interface for several interfaces/abstractions.
Adapter is an interface for the only one interface/abstraction.

Example:

- task scheduler with hidden tasks & logger
- Data Access Layer system
- video converter interface

Node.JS examples:

- setTimeout/clearTimeout are facades and hide Timers functionality (TimersList and queue)
- createServer is a facade for http.Server, Socket, Request, Response
- console is a facade for streams and format rules

Danger: facades can become "God" objects
