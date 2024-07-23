#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=salon --tuples-only --no-align --command"
echo -e "\n~~~~~ MY SALON ~~~~~\n"
echo -e "Welcome to My Salon, how can I help you?\n"

START(){
    if [[ $1 ]]
    then
        echo -e "\n$1"
    fi
    # Print services menu
    MAIN_MENU
}

MAIN_MENU(){
    SERVICES=$($PSQL "SELECT * FROM services")
    echo  "$SERVICES" | while IFS="|" read SERVICE_ID SERVICE_NAME
    do
        echo -e "$SERVICE_ID) $SERVICE_NAME"
    done

    # Select a service. Return to services menu if selection is invalid
    read SERVICE_ID_SELECTED
    SERVICE_ID_SELECTED=$($PSQL "SELECT service_id FROM services WHERE service_id=$SERVICE_ID_SELECTED")
    if [[ -z $SERVICE_ID_SELECTED ]]
    then
        START "I could not find that service. What would you like today?"
    else
        # Enter a phone number...
        echo -e "\nWhat's your phone number?"
        read CUSTOMER_PHONE

        # Find customer by phone number...
        CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

        # Create a new customer if phone not yet registered...
        if [[ -z $CUSTOMER_ID ]]
        then
            echo -e "\nI don't have a record for that phone number, what's your name?"
            read CUSTOMER_NAME
            INSERTED_CUSTOMER=$($PSQL "INSERT INTO customers(name, phone) VALUES ('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
            CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
        fi

        #echo -e "\ncustomer id found! '$CUSTOMER_ID'"
        # Register new appointment.

        CURRENT_SERVICE=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
        CURRENT_CUSTOMER=$($PSQL "SELECT name FROM customers WHERE customer_id=$CUSTOMER_ID")

        echo -e "\nWhat time would you like your $CURRENT_SERVICE, $CURRENT_CUSTOMER?"

        read SERVICE_TIME

        CURRENT_TIME=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

        echo -e "I have put you down for a $CURRENT_SERVICE at $SERVICE_TIME, $CURRENT_CUSTOMER."

    fi
}

START
