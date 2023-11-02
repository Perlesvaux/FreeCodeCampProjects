import re
from typing import Type

class ErrorTooMany(BaseException):
    def __str__(self):
        return "Too many problems."

class ErrorWrongSign(BaseException):
    def __str__(self):
        return "Operator must be \'+\' or \'-\'."

class ErrorNoMoreThan4(BaseException):
    def __str__(self):
        return "Numbers cannot be more than four digits."

class ErrorOnlyNumbers(BaseException):
    def _str_(self):
        return 'Numbers must only contain digits.'



def arithmetic_arranger(input_list:list , show_ans:bool=False):

    try:
        if len(input_list) > 5: raise ErrorTooMany

        #1- formatting output string requires 4x strings
        #   we'll use 3x lists to format the input_list
        #   and a another one to format the answers
        #   We'll later join each list component through ",".join()

        first_bit:list = []
        second_bit:list = []
        third_bit:list = []

        for item in input_list:

            if re.findall('[a-zA-Z]+', item) != []:raise ErrorOnlyNumbers

            fir = re.findall('\d+', item)[0] # before sign
            sec = re.findall('\d+', item)[1] # after sign

            if len(fir)>4 or len(sec)>4: raise ErrorNoMoreThan4

            longest = max(int(fir), int(sec))
            sign = re.findall('[\+?\-?\*?\/?]', item)[0] # + or -

            if sign in {'/', '*'}: raise ErrorWrongSign

            separator = '-'*(len(str(longest))+2) # ------

            spaces1 = ' '*(abs(len(fir)-len(separator)))
            spaces2 =' '*(abs(len(sec) - len(separator))-1)

            fir_ = f"{spaces1}{fir}"
            sec_ = f"{sign}{spaces2}{sec}"

            first_bit.append(fir_)
            second_bit.append(sec_)
            third_bit.append(separator)

        #2- find out ALL answers and store them in a list
        answers = [eval(x) for x in input_list]

        all_ans = []
        for i, val in enumerate(answers):
            spaces3 = ' '*abs(len(str(answers[i]))-len(third_bit[i]))
            all_ans.append(f'{spaces3}{answers[i]}')




        #3- convert all 4x lists in strings, add four spaces between
        #   each entry, ignore the last four spaces of each row
        row1:str = ",".join([f'{x}    '.rjust(1) for x in first_bit])[:-4]
        row2:str = ",".join([f'{x}    '.rjust(1) for x in second_bit])[:-4]
        row3:str = ",".join([f'{x}    '.rjust(1) for x in third_bit])[:-4]
        row4:str = ",".join([f'{x}    '.rjust(1) for x in all_ans])[:-4]

        #4- join everything in a single string. Append answer only if
        #   show_ans (defaults to False) is set to True
        output = f"{row1.replace(',', '')}\n{row2.replace(',', '')}\n{row3.replace(',', '')}"

        if show_ans == True: output += f"\n{row4.replace(',', '')}"
        return output
    except ErrorTooMany: return "Error: Too many problems."
    except ErrorWrongSign: return "Error: Operator must be \'+\' or \'-\'."
    except ErrorNoMoreThan4: return "Error: Numbers cannot be more than four digits."
    except ErrorOnlyNumbers: return 'Error: Numbers must only contain digits.'
