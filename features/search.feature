Feature: Buy movie tickets
    Scenario: Should buy one ticket
        Given user on the page to purchase a ticket
        When user selects a ticket
        Then user sees the booked ticket
    Scenario: Should buy some tickets
        Given user on the page to purchase a ticket
        When user selects some tickets
        Then user sees the booked ticket
    Scenario: Button should be disabled
        Given user on the page to purchase a ticket
        When user selects a seat that is not free
        Then buy button should be disabled