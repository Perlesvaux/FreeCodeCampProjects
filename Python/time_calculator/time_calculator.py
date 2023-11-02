def add_time(start:str, duration:str, weekday:str="") -> str:
    start_h, start_m = timeSep(start)       # Start
    durat_h, durat_m = timeSep(duration)    # Duration
    startMe = start[-2:]                    # AM or PM
    start_h = meridian_in(start_h, startMe) # Translate to 24hr
    total = start_h * 60 * 60 + start_m * 60 + durat_h * 60 * 60 + durat_m * 60

    _days = total//(24*60*60)
    _rem = total%(24*60*60)
    _hhh = _rem//60//60

    _mins = '%.0f' % ((total-(total//60//60)*60*60)/60)
    _hour, _meri = meridian_out(_hhh)

    extra = ''

    if _days == 0:
        extra = ''
    elif _days == 1:
        extra = '(next day)'
    elif _days > 1:
        extra = f'({_days} days later)'

    _wday = weekdays(weekday, _days)

    return f"{_hour}:{str(_mins).zfill(2)} {_meri}{_wday} {extra}".strip()

def timeSep(someStr:str) -> [str]:
    colo = ''
    for i, val in enumerate(someStr):
        if someStr[i] == ':':
            colo = i
            break
    return [int(someStr[:colo]), int(someStr[colo+1:colo+3])]

def meridian_in(hh:int, am_pm:str) -> int:
    if am_pm in {'PM'} and hh != 12:
        return hh+12
    else:
        return hh

def meridian_out(hh:str) -> [str]:
    if hh == 12:
        return [hh, 'PM']

    elif hh== 0:
        return [12, 'AM']

    elif hh > 12:
        return [hh-12, 'PM']
    else:
        return [hh, 'AM']


def weekdays(current:str, additional:int) -> [str]:
        if current == "": return ''

        start = 0
        added = (additional%7)-7

        weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

        for i, val in enumerate(weekday):
            if val == current.lower():
                start = i
                break

        return f", {weekday[start+added].capitalize()}"
