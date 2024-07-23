#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# creating teams
# create table teams(team_id SERIAL PRIMARY KEY NOT NULL, name VARCHAR(60) NOT NULL UNIQUE);
# create table games(game_id SERIAL PRIMARY KEY NOT NULL, year INT NOT NULL, winner_id INT NOT NULL, opponent_id INT NOT NULL, winner_goals INT NOT NULL, opponent_goals INT NOT NULL, round VARCHAR(50) NOT NULL);




#:'
# game_id        | integer               |           | not null | nextval('games_game_id_seq'::regclass)
# year           | integer               |           | not null |
# winner_id      | integer               |           | not null |
# opponent_id    | integer               |           | not null |
# winner_goals   | integer               |           | not null |
# opponent_goals | integer               |           | not null |
# round          | character varying(60) |           | not null |
#'


echo $($PSQL "TRUNCATE teams, games")

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do

  # ignore first row
  if [[ $YEAR != "year" ]]
  then

    # fetch team_id...
    TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

    # only add entry if it doesn't exist already
    if [[ -z $TEAM_ID ]]
    then
      # insert team
      INSERT_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")

      if [[ $INSERT_TEAM="INSERT 0 1" ]]
      then
        echo "Inserted team: $OPPONENT"
      fi

    fi



    # fetch team_id...
    TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")

    # only add entry if it doesn't exist already
    if [[ -z $TEAM_ID ]]
    then
      # insert team
      INSERT_TEAM=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")

      if [[ $INSERT_TEAM="INSERT 0 1" ]]
      then
        echo "Inserted team: $WINNER"
      fi

    fi




  fi
done



cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  # ignore first row
  if [[ $YEAR != "year" ]]
  then
    # fetch team_id's...
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

    INSERT_GAME=$($PSQL "INSERT INTO games(year, winner_id, opponent_id, winner_goals, opponent_goals, round) VALUES($YEAR, $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS, '$ROUND')")
    if [[ $INSERT_GAME="INSERT 0 1" ]]
    then
      echo "Inserted game: year $YEAR won by $WINNER_ID"
    fi

  fi

done
