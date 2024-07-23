#!/bin/bash
#Some heads are gonna roll! --Rob H.
RAND=$(( $RANDOM % 5 + 1)) #1000

echo $RAND #delete
echo "Enter your username:"
read USERNAME

PSQL="psql --username=freecodecamp --dbname=users --tuples-only --no-align --command"

USER=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")

# Greetings!
if [[ -z $USER ]]
then
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    NEWUSER=$($PSQL "INSERT INTO users(username) values('$USERNAME')")
    USER=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")
    else 

    echo "$USER" | while IFS="|" read USERNAME GAMES BEST
    do
        echo "Welcome back, $USERNAME! You have played $GAMES games, and your best game took $BEST guesses."

    done

fi

echo "Guess the secret number between 1 and 1000:"
USER_INPUT=""
ATTEMPTS=0
while [[ $USER_INPUT != $RAND ]]
do
    read USER_INPUT

# Input is nonsense
    if [[ ! $USER_INPUT =~ [0-9]+ ]]
    then
        echo "That is not an integer, guess again:"
    else

        ATTEMPTS=$(($ATTEMPTS+1))

        # Input is greater than random number
        if [[ $USER_INPUT -gt $RAND ]]
        then 
            echo "It's lower than that, guess again:"
        fi

        # Input is smaller than random number
        if [[ $USER_INPUT -lt $RAND ]]
        then 
            echo "It's higher than that, guess again:"
        fi


        
        
        

        # GAME SET!
        if [[ $USER_INPUT == $RAND ]]
        then
            echo "You guessed it in $ATTEMPTS tries. The secret number was $RAND. Nice job!"

            echo "$USER" | while IFS="|" read USERNAME GAMES BEST
            do
                SET_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played=$(($GAMES+1)) WHERE username='$USERNAME'")

                if [[ $ATTEMPTS -lt $BEST ]]
                then
                    SET_BEST_GAME=$($PSQL "UPDATE users SET best_game=$ATTEMPTS WHERE username='$USERNAME'")
                fi

            done 

            
        fi
    fi 
done



# Complete the tasks below

# Create a number_guessing_game folder in the project folder for your program

# Create number_guess.sh in your number_guessing_game folder and give it executable permissions

# Your script should have a shebang at the top of the file that uses #!/bin/bash

# Turn the number_guessing_game folder into a git repository

# Your git repository should have at least five commits

# Your script should randomly generate a number that users have to guess

# When you run your script, you should prompt the user for a username with Enter your username:, and take a username as input. Your database should allow usernames that are 22 characters

# If that username has been used before, it should print Welcome back, <username>! You have played <games_played> games, and your best game took <best_game> guesses., with <username> being a users name from the database, <games_played> being the total number of games that user has played, and <best_game> being the fewest number of guesses it took that user to win the game

# If the username has not been used before, you should print Welcome, <username>! It looks like this is your first time here.

# The next line printed should be Guess the secret number between 1 and 1000: and input from the user should be read

# Until they guess the secret number, it should print It's lower than that, guess again: if the previous input was higher than the secret number, and It's higher than that, guess again: if the previous input was lower than the secret number. Asking for input each time until they input the secret number.

# If anything other than an integer is input as a guess, it should print That is not an integer, guess again:

# When the secret number is guessed, your script should print You guessed it in <number_of_guesses> tries. The secret number was <secret_number>. Nice job! and finish running

# The message for the first commit should be Initial commit

# The rest of the commit messages should start with fix:, feat:, refactor:, chore:, or test:

# You should finish your project while on the main branch, your working tree should be clean, and you should not have any uncommitted changes


