PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

QUERY=""

if [[ $1 ]]
then

    if [[ $1 =~ [0-9]+ ]]
    then
        QUERY="atomic_number=$1"
    
    elif [[ $1 =~ ... ]]
    then
        QUERY="name='$1'"
    

    elif [[ $1 =~ [A-Z]|[A-Z][a-zA-Z] ]]
    then 
        QUERY="symbol='$1'"
    fi
    

    ELEMENT=$($PSQL "select atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius from elements join properties using (atomic_number) join types using (type_id) where $QUERY")


    if [[ -z $ELEMENT ]]
    then 
        echo "I could not find that element in the database."
    else
        echo "$ELEMENT" | while IFS="|" read ATOMIC_NUMBER SYMBOL NAME TYPE MASS MELTING BOILING
        do
        echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
        done 
    fi

else
    echo "Please provide an element as an argument."
fi

