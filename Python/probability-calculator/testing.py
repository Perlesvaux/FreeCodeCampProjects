from prob_calculator import Hat
from prob_calculator import experiment
# h = Hat(green=5, blue=2)
# print(h.contents)
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))
# print(h.draw(2))

# hat = Hat(black=6, red=4, green=3)
# probability = experiment(hat=hat,
#                   expected_balls={"red":2,"green":1},
#                   num_balls_drawn=5,
#                   num_experiments=5)


# hat = Hat(black=5, red=5)
# probability = experiment(hat=hat,
#                          expected_balls={"red":1, "black":1},
#                   num_balls_drawn=2,
#                   num_experiments=1000)
# print(probability)


hat = Hat(black=9, red=1)
probability = experiment(hat=hat,
                         expected_balls={"red":1 },
                  num_balls_drawn=1,
                  num_experiments=1000)
print(probability)
