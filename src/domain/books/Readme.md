# Domain for books

Library has few interfaces that allow to cover usecases of
the library process.

## Key entities (types) and what they represent

Core entities:
Book — a class of the book
MyBook(Book) — concerete book of the class given class

## Actors (users, admins, bots, etc.) relevant to this domain

Core actors:
visitor — visitor of the library
librarian — the worker of the library

## Use cases

Use-case scenarios:

- [SCNR-1] User watching books and find interesting ones
- [SCNR-2] User takes a book by scanning QR code or entering id manually
- [SCNR-3] User returns a book

### SCNR-1. User watching books and find interesting ones

A User can list the books, filtering an interesting ones.
The purpose is to find a library where a book is and if it's available.

See hooks/useBooksSearch

### SCNR-2. User takes a book

A visitor scans QR in the book and stores info that the book is taken by
that user.

### SCNR-3. User returns a book

Visitors can list taken books, and they can return a book.

See hooks/useBooksSearch

## Constraints
