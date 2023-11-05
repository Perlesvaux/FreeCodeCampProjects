# This entrypoint file to be used in development. Start by reading README.md

import budget
from budget import create_spend_chart
from unittest import main

food = budget.Category("Food")
food.deposit(1000, "initial deposit")
food.withdraw(10.15, "groceries")
food.withdraw(15.89, "restaurant and more food for dessert")
print(food.get_balance())
clothing = budget.Category("Clothing")
food.transfer(50, clothing)
clothing.withdraw(25.55)
clothing.withdraw(100)
auto = budget.Category("Auto")
auto.deposit(1000, "initial deposit")
auto.withdraw(15)

print(food)
print(clothing)

print(create_spend_chart([food, clothing, auto]))

# Run unit tests automatically
main(module='test_module', exit=False)





# traveling=budget.Category("Traveling")
# traveling.deposit(90, "cash handling")
# traveling.withdraw(41, "pital")
# traveling.withdraw(33, "planes de renderos")
# entertainment= budget.Category("Entertainment")
# food = budget.Category("Food")
# clothing = budget.Category("Clothing")
# entertainment.deposit(150, "salary")
# entertainment.withdraw(50, "internet")
# entertainment.withdraw(50, "cable")
# entertainment.transfer(20, food)
# food.deposit(100, "BD gift")
# food.withdraw(60, "Expensive meat")
# food.withdraw(60, "Expensive meat")
# traveling.transfer(5, clothing)
# print(food.get_balance())
# food.transfer(10, clothing)
# clothing.withdraw(5, "calcetines")
# clothing.withdraw(5, "calcetas")
# print(food.ledger)
# print(clothing.ledger)
# print(clothing.get_balance())
# print(clothing)
# print(food)
# print(food.spending())
# # food.withdraw(50, "expensive meat")
# # food.get_balance()
# budget.create_spend_chart([food, clothing, entertainment, traveling])
