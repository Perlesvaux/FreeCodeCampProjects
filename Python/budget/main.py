# This entrypoint file to be used in development. Start by reading README.md

import budget
# from budget import create_spend_chart
# from unittest import main

# food = budget.Category("Food")
# food.deposit(1000, "initial deposit")
# food.withdraw(10.15, "groceries")
# food.withdraw(15.89, "restaurant and more food for dessert")
# print(food.get_balance())
# clothing = budget.Category("Clothing")
# food.transfer(50, clothing)
# clothing.withdraw(25.55)
# clothing.withdraw(100)
# auto = budget.Category("Auto")
# auto.deposit(1000, "initial deposit")
# auto.withdraw(15)

# print(food)
# print(clothing)

# print(create_spend_chart([food, clothing, auto]))

# Run unit tests automatically
# main(module='test_module', exit=False)

food = budget.Category("Food")
clothing = budget.Category("Clothing")
food.deposit(100, "BD gift")
food.withdraw(60, "Expensive meat")
food.withdraw(60, "Expensive meat")
print(food.get_balance())
food.transfer(10, clothing)
clothing.withdraw(5, "calcetines")
clothing.withdraw(5, "calcetas")
print(food.ledger)
print(clothing.ledger)
print(clothing.get_balance())
print(clothing)
print(food)
print(food.spending())
# food.withdraw(50, "expensive meat")
# food.get_balance()
budget.create_spend_chart([food, clothing])
