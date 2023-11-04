import math

class Category:
  def __init__(self, name):
    self.name = name
    self.ledger = []

  def get_balance(self):
    sum_up=0
    for x in self.ledger:
      sum_up += x["amount"]
    return sum_up

  def check_funds(self, amount):
    return self.get_balance()>amount

  def deposit(self, amount, description=""):
    self.ledger.append({"amount": amount, "description": description})

  def withdraw(self, amount, description=""):
    result = self.check_funds(amount)
    if result:
      self.ledger.append({"amount": amount*-1, "description": description})
    return result

  def transfer(self, amount, category):
    result = self.check_funds(amount)
    if result:
      self.withdraw(amount, f"Transfer to {category.name}")
      category.deposit(amount, f"Transfer from {self.name}")
    return result

  def spending(self):
    result=0
    for x in self.ledger:
        if x["amount"]<0:
            result+=x["amount"]
    return result*-1


  def __str__(self):
    whole = (30-len(self.name))//2*"*" + self.name + (30-len(self.name))//2*"*" + "\n"
    for x in self.ledger:
        if len(x["description"])>23:
            whole += x["description"][:23].ljust(23) + " {:.2f}".format(x["amount"]) + "\n"
        else:
            whole += x["description"].ljust(23) + " {:.2f}".format(x["amount"]).rjust(7) + "\n"

    whole += f"Total: {self.get_balance()}"

    return whole





def create_spend_chart(categories):
    # _100={"name":"100|", "o":" "}
    # _009={"name":" 90|", "o":" "}
    # _008={"name":" 80|", "o":" "}
    # _007={"name":" 70|", "o":" "}
    # _006={"name":" 60|", "o":" "}
    # _005={"name":" 50|", "o":" "}
    # _004={"name":" 40|", "o":" "}
    # _003={"name":" 30|", "o":" "}
    # _002={"name":" 20|", "o":" "}
    # _001={"name":" 10|", "o":" "}
    # _000={"name":"  0|", "o":" "}

    y_axis = [
        {"value":100, "name":"100|", "o":" "},
        {"value": 90, "name":" 90|", "o":" "},
        {"value": 80, "name":" 80|", "o":" "},
        {"value": 70, "name":" 70|", "o":" "},
        {"value": 60, "name":" 60|", "o":" "},
        {"value": 50, "name":" 50|", "o":" "},
        {"value": 40, "name":" 40|", "o":" "},
        {"value": 30, "name":" 30|", "o":" "},
        {"value": 20, "name":" 20|", "o":" "},
        {"value": 10, "name":" 10|", "o":" "},
        {"value":  0, "name":"  0|", "o":" "}
    ]


    total_spending=0
    for x in categories:
        total_spending += x.spending()

    spending_percent=[]
    for x in categories:
        spending_percent.append(math.floor((x.spending()*100)/total_spending/10)*10)

    y_axis.reverse()
    for x in spending_percent:
        for y in y_axis:
            if x >= y["value"]:
                y["o"]+= "o  "
        # if x <= 100: _100["o"]+="o  "



    whole = "Percentage spent by category\n"
    y_axis.reverse()
    for y in y_axis:
        whole += f"{y['name']}{y['o']}\n"

    whole += "    ----------\n"

    largest = 0
    for x in categories:
        if len( x.name ) > largest:
            largest=len(x.name)

    titles=[" "*largest] #originally 4
    for x in categories:
        titles.append( x.name.ljust(largest) )


    # for x in titles:
    #     for y in x:
    #         whole+=f"{y}\b"

    # for i, val in enumerate( titles ):
    #     for n in range(largest):
    #         whole+=val[n]+"\n"


    for x in range(largest):
        for title in titles:
            whole+=f"  {title[x]}"
        whole+="\n"



    print(whole)

    return whole





