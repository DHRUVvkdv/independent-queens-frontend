export const ics: string = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ellucian//Registration SS//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VTIMEZONE
TZID:America/New_York
LAST-MODIFIED:20250121T082933Z
TZURL:https://www.tzurl.org/zoneinfo/America/New_York
X-LIC-LOCATION:America/New_York
X-PROLEPTIC-TZNAME:LMT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-045602
TZOFFSETTO:-0500
DTSTART:18831118T120358
END:STANDARD
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19180331T020000
RRULE:FREQ=YEARLY;UNTIL=19200328T070000Z;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19181027T020000
RRULE:FREQ=YEARLY;UNTIL=19201031T060000Z;BYMONTH=10;BYDAY=-1SU
END:STANDARD
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19210424T020000
RRULE:FREQ=YEARLY;UNTIL=19410427T070000Z;BYMONTH=4;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19210925T020000
RRULE:FREQ=YEARLY;UNTIL=19410928T060000Z;BYMONTH=9;BYDAY=-1SU
END:STANDARD
BEGIN:DAYLIGHT
TZNAME:EWT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19420209T020000
END:DAYLIGHT
BEGIN:DAYLIGHT
TZNAME:EPT
TZOFFSETFROM:-0400
TZOFFSETTO:-0400
DTSTART:19450814T190000
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19450930T020000
END:STANDARD
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19460428T020000
RRULE:FREQ=YEARLY;UNTIL=19730429T070000Z;BYMONTH=4;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19460929T020000
RRULE:FREQ=YEARLY;UNTIL=19540926T060000Z;BYMONTH=9;BYDAY=-1SU
END:STANDARD
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19551030T020000
RRULE:FREQ=YEARLY;UNTIL=20061029T060000Z;BYMONTH=10;BYDAY=-1SU
END:STANDARD
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19740106T020000
RDATE:19750223T020000
END:DAYLIGHT
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19760425T020000
RRULE:FREQ=YEARLY;UNTIL=19860427T070000Z;BYMONTH=4;BYDAY=-1SU
END:DAYLIGHT
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19870405T020000
RRULE:FREQ=YEARLY;UNTIL=20060402T070000Z;BYMONTH=4;BYDAY=1SU
END:DAYLIGHT
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:20070311T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:20071104T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20250201T181456Z
DTSTART;TZID=America/New_York:20250122T173000
DTEND;TZID=America/New_York:20250122T184500
SUMMARY:Computer Systems CS 3214 0
RRULE:FREQ=WEEKLY;UNTIL=20250514T225900;BYDAY=MO,WE
TZID:America/New_York
UID:20250201T181456Z-Ellucian
LOCATION:Campus: Blacksburg Building: McBryde Hall Room: 100 
DESCRIPTION:CRN: 13394\nCredit Hours: 3.0\nLevel: Undergraduate\nInstructor: Ali Butt (Primary) \n
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250201T181456Z
DTSTART;TZID=America/New_York:20250122T160000
DTEND;TZID=America/New_York:20250122T171500
SUMMARY:Professionalism in Computing CS 3604 0
RRULE:FREQ=WEEKLY;UNTIL=20250514T225900;BYDAY=MO,WE
TZID:America/New_York
UID:20250201T181457Z-Ellucian
LOCATION:Campus: Virtual Building: ONLINE 
DESCRIPTION:CRN: 13401\nCredit Hours: 3.0\nLevel: Undergraduate\nInstructor: Daniel Dunlap (Primary) \n
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250201T181456Z
DTSTART;TZID=America/New_York:20250121T170000
DTEND;TZID=America/New_York:20250121T181500
SUMMARY:Introduction to Formal Languages and Automata Theory CS 4114 0
RRULE:FREQ=WEEKLY;UNTIL=20250514T225900;BYDAY=TU,TH
TZID:America/New_York
UID:20250201T181458Z-Ellucian
LOCATION:Campus: Blacksburg Building: Goodwin Hall Room: 115 
DESCRIPTION:CRN: 13424\nCredit Hours: 3.0\nLevel: Undergraduate\nInstructor: Lenwood Heath (Primary) \n
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250201T181456Z
DTSTART;TZID=America/New_York:20250122T111500
DTEND;TZID=America/New_York:20250122T120500
SUMMARY:Cryptography MATH 4175 0
RRULE:FREQ=WEEKLY;UNTIL=20250514T225900;BYDAY=MO,WE,FR
TZID:America/New_York
UID:20250201T181459Z-Ellucian
LOCATION:Campus: Blacksburg Building: McBryde Hall Room: 232 
DESCRIPTION:CRN: 17436\nCredit Hours: 3.0\nLevel: Undergraduate\nInstructor: Palanivel Manoharan (Primary) \n
END:VEVENT
END:VCALENDAR
`