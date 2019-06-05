---
layout: post
title: "Language Trends By Developer Type - Stack Overflow Developer Survey 2019"
permalink: "/blog/language-trends-by-dev-type-stack-overflow-dev-survey-2019"
description: "A brief analysis of what technologies (languages, frameworks, platforms) developers of various types work with and what they wish to work with in 2020."
---

About two months ago, Stack Overflow released the results of their annual Developer Survey.

In the [r/programming discussion](https://redd.it/bb83gd) of these results, a few folks were disappointed that Stack Overflow's official analysis of the data did not separate popularity data for languages, platforms, frameworks etc. by developer type.

<a class="embedly-card" href="https://www.reddit.com/r/programming/comments/bb83gd/stackoverflow_developer_survey_results_2019/ekhc3go">Card</a>
<script async src="//embed.redditmedia.com/widgets/platform.js" charset="UTF-8"></script>

So I waited for the dataset to be [released under ODbL](https://insights.stackoverflow.com/survey), and re-parsed the popularity numbers myself.

<!--more-->

## Data Format

The data in this post comes from two dimensions from the Developer Survey:

1. "Which of the following describe you? Please select all that apply."
2. "Which of the following (programming, scripting, and markup languages \| database environments \| platforms \| web frameworks \| other frameworks, libraries, and tools) have you done extensive development work in over the past year, and which do you want to work in over the next year?  (If you both worked with the language and want to continue to do so, please check both boxes in that row.)"

(That second question was asked as five different questions that I combined for the sake of brevity.)

I have also commingled all the technology types together.

This post contains an excerpt of the data; for each developer type, I've displayed the top 15 "haves" and "wants", which should be enough to get a rough idea of the trend.

I have included the (kinda ugly) Python script I threw together that you can run on the Stack Overflow results yourself if you wish to modify the results in any way. Try separating out the types of *technologies* in addition to developer type!

## Data Galore

### Developer, Desktop Or Enterprise Applications

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Windows | 12357 | Windows | 9103 |
| #2  | JavaScript | 11748 | JavaScript | 8707 |
| #3  | HTML/CSS | 11178 | Linux | 8695 |
| #4  | SQL | 11006 | SQL | 7792 |
| #5  | C# | 9297 | C# | 7753 |
| #6  | Linux | 8502 | HTML/CSS | 7548 |
| #7  | .NET | 8264 | Python | 7108 |
| #8  | Microsoft SQL Server | 8024 | Docker | 6519 |
| #9  | MySQL | 7826 | .NET Core | 6328 |
| #10 | Java | 7739 | .NET | 6241 |
| #11 | jQuery | 6969 | Node.js | 6233 |
| #12 | Bash/Shell/PowerShell | 6745 | Android | 6057 |
| #13 | Python | 6274 | Microsoft SQL Server | 5715 |
| #14 | ASP.NET | 5807 | React.js | 5220 |
| #15 | SQLite | 5778 | Other(s): | 5218 |

### Developer, Front-End

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 23376 | JavaScript | 18571 |
| #2  | HTML/CSS | 22285 | HTML/CSS | 16350 |
| #3  | SQL | 15630 | Node.js | 13786 |
| #4  | MySQL | 14178 | React.js | 13160 |
| #5  | jQuery | 13662 | Linux | 11543 |
| #6  | Windows | 13126 | SQL | 11185 |
| #7  | Node.js | 12626 | TypeScript | 10909 |
| #8  | Linux | 11644 | Python | 10415 |
| #9  | Java | 10021 | Docker | 10197 |
| #10 | React.js | 9608 | Windows | 9356 |
| #11 | PHP | 9578 | MySQL | 9128 |
| #12 | C# | 9179 | Vue.js | 9079 |
| #13 | Angular/Angular.js | 9054 | MongoDB | 8799 |
| #14 | TypeScript | 8858 | Android | 8615 |
| #15 | Bash/Shell/PowerShell | 8850 | Angular/Angular.js | 8610 |

### Designer

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | HTML/CSS | 7243 | JavaScript | 5818 |
| #2  | JavaScript | 7192 | HTML/CSS | 5488 |
| #3  | SQL | 5526 | Node.js | 4172 |
| #4  | MySQL | 5108 | SQL | 4099 |
| #5  | Windows | 4973 | Linux | 4025 |
| #6  | jQuery | 4686 | Python | 3916 |
| #7  | Linux | 3997 | Windows | 3751 |
| #8  | PHP | 3694 | React.js | 3571 |
| #9  | Java | 3621 | Android | 3516 |
| #10 | Node.js | 3607 | MySQL | 3460 |
| #11 | C# | 3256 | jQuery | 2927 |
| #12 | Python | 3238 | MongoDB | 2772 |
| #13 | Bash/Shell/PowerShell | 3027 | TypeScript | 2772 |
| #14 | Microsoft SQL Server | 2951 | Other(s): | 2752 |
| #15 | Android | 2951 | C# | 2745 |

### Developer, Back-End

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 29372 | Linux | 22144 |
| #2  | HTML/CSS | 26605 | JavaScript | 21350 |
| #3  | SQL | 26031 | Docker | 18867 |
| #4  | Linux | 22784 | Python | 18132 |
| #5  | MySQL | 21109 | SQL | 18119 |
| #6  | Windows | 19691 | HTML/CSS | 17247 |
| #7  | Java | 17904 | Node.js | 15459 |
| #8  | Python | 16537 | PostgreSQL | 14901 |
| #9  | jQuery | 16358 | AWS | 14481 |
| #10 | Bash/Shell/PowerShell | 16281 | React.js | 14235 |
| #11 | Docker | 14881 | Windows | 13472 |
| #12 | Node.js | 14642 | MySQL | 13106 |
| #13 | PostgreSQL | 14465 | MongoDB | 12248 |
| #14 | C# | 14071 | TypeScript | 11947 |
| #15 | Microsoft SQL Server | 13430 | Java | 11858 |

### Developer, Full-Stack

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 36376 | JavaScript | 27234 |
| #2  | HTML/CSS | 33329 | HTML/CSS | 22777 |
| #3  | SQL | 27674 | Linux | 20879 |
| #4  | MySQL | 22199 | Node.js | 20064 |
| #5  | Linux | 21412 | Docker | 19445 |
| #6  | Windows | 20841 | React.js | 19313 |
| #7  | jQuery | 20583 | SQL | 19147 |
| #8  | Node.js | 19363 | Python | 17745 |
| #9  | Java | 17201 | TypeScript | 16745 |
| #10 | Bash/Shell/PowerShell | 16005 | PostgreSQL | 15469 |
| #11 | C# | 15832 | AWS | 15399 |
| #12 | Python | 15406 | Windows | 14163 |
| #13 | PostgreSQL | 15076 | MongoDB | 13907 |
| #14 | Microsoft SQL Server | 15069 | MySQL | 13592 |
| #15 | Docker | 14766 | Vue.js | 13412 |

### Academic Researcher

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Linux | 3651 | Python | 3644 |
| #2  | Python | 3621 | Linux | 3513 |
| #3  | HTML/CSS | 3313 | JavaScript | 2430 |
| #4  | JavaScript | 3217 | SQL | 2098 |
| #5  | Windows | 2849 | HTML/CSS | 2078 |
| #6  | SQL | 2820 | Other(s): | 2046 |
| #7  | MySQL | 2817 | TensorFlow | 1995 |
| #8  | Java | 2506 | Docker | 1978 |
| #9  | Bash/Shell/PowerShell | 2417 | Windows | 1918 |
| #10 | C++ | 2364 | MySQL | 1910 |
| #11 | C | 2051 | C++ | 1846 |
| #12 | Other(s): | 1992 | Android | 1830 |
| #13 | SQLite | 1979 | Node.js | 1767 |
| #14 | jQuery | 1861 | Bash/Shell/PowerShell | 1722 |
| #15 | Android | 1689 | PostgreSQL | 1663 |

### Developer, Mobile

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Android | 9978 | Android | 9064 |
| #2  | JavaScript | 9953 | JavaScript | 7508 |
| #3  | HTML/CSS | 9181 | iOS | 6744 |
| #4  | Java | 8409 | HTML/CSS | 6123 |
| #5  | SQL | 7536 | Node.js | 6059 |
| #6  | MySQL | 7453 | Linux | 5790 |
| #7  | SQLite | 7012 | Python | 5515 |
| #8  | Windows | 6197 | React.js | 5364 |
| #9  | iOS | 6136 | SQL | 5231 |
| #10 | Linux | 5794 | SQLite | 5103 |
| #11 | Node.js | 5707 | Kotlin | 5103 |
| #12 | jQuery | 5460 | Java | 5070 |
| #13 | C# | 5048 | MySQL | 4802 |
| #14 | Python | 4685 | Docker | 4729 |
| #15 | PHP | 4514 | Firebase | 4415 |

### Data Or Business Analyst

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | SQL | 4650 | SQL | 3724 |
| #2  | HTML/CSS | 3909 | Python | 3685 |
| #3  | JavaScript | 3860 | JavaScript | 3080 |
| #4  | Windows | 3548 | Linux | 2959 |
| #5  | Python | 3264 | HTML/CSS | 2711 |
| #6  | MySQL | 3209 | Windows | 2528 |
| #7  | Linux | 3006 | MySQL | 2222 |
| #8  | Microsoft SQL Server | 2912 | PostgreSQL | 2191 |
| #9  | Bash/Shell/PowerShell | 2419 | Docker | 2160 |
| #10 | jQuery | 2368 | Microsoft SQL Server | 2115 |
| #11 | Java | 2138 | Other(s): | 2110 |
| #12 | Other(s): | 2096 | Node.js | 2053 |
| #13 | PostgreSQL | 2086 | AWS | 2013 |
| #14 | C# | 2048 | TensorFlow | 1898 |
| #15 | SQLite | 1963 | MongoDB | 1815 |

### Data Scientist Or Machine Learning Specialist

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Python | 5125 | Python | 4824 |
| #2  | Linux | 4100 | Linux | 3856 |
| #3  | SQL | 3775 | TensorFlow | 3585 |
| #4  | JavaScript | 3319 | Pandas | 2937 |
| #5  | HTML/CSS | 3258 | SQL | 2737 |
| #6  | Windows | 3016 | Docker | 2732 |
| #7  | Pandas | 2984 | JavaScript | 2403 |
| #8  | MySQL | 2926 | PostgreSQL | 2307 |
| #9  | Bash/Shell/PowerShell | 2874 | AWS | 2283 |
| #10 | PostgreSQL | 2455 | Other(s): | 2183 |
| #11 | Java | 2453 | Torch/PyTorch | 2131 |
| #12 | TensorFlow | 2399 | Bash/Shell/PowerShell | 1972 |
| #13 | Docker | 2251 | Windows | 1925 |
| #14 | SQLite | 2150 | HTML/CSS | 1898 |
| #15 | Other(s): | 2067 | MySQL | 1892 |

### Database Administrator

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | SQL | 7778 | SQL | 6050 |
| #2  | JavaScript | 7436 | JavaScript | 5614 |
| #3  | HTML/CSS | 7253 | Linux | 5393 |
| #4  | MySQL | 5909 | HTML/CSS | 5106 |
| #5  | Linux | 5532 | Python | 4470 |
| #6  | Windows | 5524 | Windows | 3993 |
| #7  | jQuery | 4892 | Node.js | 3950 |
| #8  | Microsoft SQL Server | 4307 | Docker | 3874 |
| #9  | Bash/Shell/PowerShell | 4303 | MySQL | 3857 |
| #10 | PHP | 4204 | PostgreSQL | 3690 |
| #11 | Python | 3945 | Other(s): | 3377 |
| #12 | C# | 3825 | C# | 3233 |
| #13 | Node.js | 3684 | React.js | 3204 |
| #14 | Java | 3657 | AWS | 3200 |
| #15 | PostgreSQL | 3485 | Android | 3183 |

### Engineer, Data

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | SQL | 3884 | Python | 3568 |
| #2  | Linux | 3779 | Linux | 3503 |
| #3  | Python | 3742 | SQL | 2838 |
| #4  | JavaScript | 3499 | Docker | 2690 |
| #5  | HTML/CSS | 3286 | JavaScript | 2479 |
| #6  | MySQL | 2971 | AWS | 2301 |
| #7  | Bash/Shell/PowerShell | 2825 | PostgreSQL | 2269 |
| #8  | Windows | 2756 | Other(s): | 2223 |
| #9  | Java | 2484 | TensorFlow | 2139 |
| #10 | PostgreSQL | 2377 | HTML/CSS | 1958 |
| #11 | Docker | 2331 | Bash/Shell/PowerShell | 1893 |
| #12 | Other(s): | 2209 | Windows | 1839 |
| #13 | AWS | 2094 | Node.js | 1830 |
| #14 | SQLite | 1909 | MySQL | 1827 |
| #15 | Node.js | 1882 | Pandas | 1720 |

### Engineer, Site Reliability

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Linux | 2180 | Linux | 2021 |
| #2  | JavaScript | 2049 | Docker | 1729 |
| #3  | Bash/Shell/PowerShell | 1890 | Python | 1561 |
| #4  | HTML/CSS | 1853 | AWS | 1434 |
| #5  | SQL | 1811 | Kubernetes | 1427 |
| #6  | Python | 1748 | PostgreSQL | 1389 |
| #7  | Docker | 1696 | JavaScript | 1372 |
| #8  | MySQL | 1604 | Go | 1302 |
| #9  | AWS | 1522 | Other(s): | 1256 |
| #10 | PostgreSQL | 1457 | Bash/Shell/PowerShell | 1254 |
| #11 | Node.js | 1225 | SQL | 1223 |
| #12 | Other(s): | 1217 | Redis | 1218 |
| #13 | Redis | 1215 | HTML/CSS | 1169 |
| #14 | Java | 1198 | Node.js | 1033 |
| #15 | Windows | 1101 | Elasticsearch | 994 |

### Developer, QA Or Test

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 4666 | JavaScript | 3541 |
| #2  | HTML/CSS | 4471 | Linux | 3441 |
| #3  | SQL | 4121 | HTML/CSS | 3093 |
| #4  | Linux | 3510 | Python | 2976 |
| #5  | Windows | 3505 | SQL | 2973 |
| #6  | MySQL | 3387 | Docker | 2781 |
| #7  | Bash/Shell/PowerShell | 2908 | Node.js | 2629 |
| #8  | Java | 2876 | Windows | 2466 |
| #9  | jQuery | 2794 | React.js | 2303 |
| #10 | Python | 2676 | MySQL | 2179 |
| #11 | Node.js | 2462 | Android | 2145 |
| #12 | C# | 2383 | AWS | 2130 |
| #13 | Microsoft SQL Server | 2296 | PostgreSQL | 2116 |
| #14 | Docker | 2165 | Other(s): | 2073 |
| #15 | PostgreSQL | 2139 | C# | 2019 |

### DevOps Specialist

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 6529 | Linux | 5962 |
| #2  | Linux | 6315 | Docker | 5902 |
| #3  | HTML/CSS | 5907 | JavaScript | 4510 |
| #4  | SQL | 5721 | Python | 4419 |
| #5  | Bash/Shell/PowerShell | 5670 | Kubernetes | 4215 |
| #6  | Docker | 5472 | AWS | 4106 |
| #7  | Python | 4647 | PostgreSQL | 3923 |
| #8  | MySQL | 4449 | Bash/Shell/PowerShell | 3845 |
| #9  | AWS | 4077 | SQL | 3792 |
| #10 | PostgreSQL | 4067 | HTML/CSS | 3699 |
| #11 | Node.js | 3954 | Node.js | 3527 |
| #12 | Windows | 3902 | Redis | 3521 |
| #13 | Java | 3651 | Go | 3214 |
| #14 | jQuery | 3216 | Other(s): | 3207 |
| #15 | Other(s): | 3181 | React.js | 3058 |

### Developer, Game Or Graphics

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 3064 | Linux | 2254 |
| #2  | HTML/CSS | 2946 | Windows | 2210 |
| #3  | Windows | 2879 | JavaScript | 2158 |
| #4  | C# | 2411 | Unity 3D | 2105 |
| #5  | Linux | 2208 | C# | 1999 |
| #6  | SQL | 2171 | Android | 1982 |
| #7  | C++ | 2124 | HTML/CSS | 1941 |
| #8  | MySQL | 2108 | Python | 1899 |
| #9  | Unity 3D | 2037 | C++ | 1820 |
| #10 | Android | 2032 | Node.js | 1651 |
| #11 | Java | 2012 | Other(s): | 1516 |
| #12 | Python | 1963 | SQL | 1440 |
| #13 | Node.js | 1732 | Unreal Engine | 1382 |
| #14 | jQuery | 1689 | MySQL | 1379 |
| #15 | Bash/Shell/PowerShell | 1663 | React.js | 1347 |

### Educator

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 3151 | JavaScript | 2446 |
| #2  | HTML/CSS | 3151 | Linux | 2438 |
| #3  | SQL | 2557 | Python | 2323 |
| #4  | Linux | 2497 | HTML/CSS | 2185 |
| #5  | MySQL | 2373 | SQL | 1913 |
| #6  | Windows | 2214 | Node.js | 1833 |
| #7  | Python | 2112 | Other(s): | 1755 |
| #8  | Java | 1988 | Docker | 1742 |
| #9  | Bash/Shell/PowerShell | 1837 | MySQL | 1608 |
| #10 | jQuery | 1818 | React.js | 1605 |
| #11 | Node.js | 1694 | Windows | 1592 |
| #12 | Other(s): | 1673 | PostgreSQL | 1522 |
| #13 | SQLite | 1612 | Android | 1504 |
| #14 | PHP | 1529 | MongoDB | 1392 |
| #15 | PostgreSQL | 1462 | Bash/Shell/PowerShell | 1319 |

### Student

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | HTML/CSS | 8122 | Python | 7019 |
| #2  | JavaScript | 7574 | JavaScript | 6319 |
| #3  | Java | 6482 | Linux | 6314 |
| #4  | Python | 6481 | HTML/CSS | 5442 |
| #5  | MySQL | 6378 | SQL | 4813 |
| #6  | SQL | 6179 | Node.js | 4692 |
| #7  | Windows | 6124 | MySQL | 4621 |
| #8  | Linux | 5954 | Android | 4618 |
| #9  | C++ | 4720 | Windows | 4545 |
| #10 | C | 4519 | Java | 4327 |
| #11 | jQuery | 4274 | React.js | 4077 |
| #12 | Android | 4077 | MongoDB | 3809 |
| #13 | Bash/Shell/PowerShell | 4050 | C++ | 3801 |
| #14 | Node.js | 3895 | Docker | 3654 |
| #15 | PHP | 3735 | TensorFlow | 3365 |

### Engineering Manager

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 3040 | Linux | 2372 |
| #2  | HTML/CSS | 2732 | JavaScript | 2182 |
| #3  | Linux | 2560 | Docker | 2152 |
| #4  | SQL | 2538 | Python | 1904 |
| #5  | Bash/Shell/PowerShell | 2063 | AWS | 1894 |
| #6  | MySQL | 1991 | HTML/CSS | 1800 |
| #7  | Python | 1969 | SQL | 1749 |
| #8  | Docker | 1931 | PostgreSQL | 1727 |
| #9  | AWS | 1900 | Node.js | 1617 |
| #10 | PostgreSQL | 1790 | React.js | 1542 |
| #11 | Windows | 1785 | Other(s): | 1501 |
| #12 | Node.js | 1760 | Kubernetes | 1464 |
| #13 | Java | 1673 | Redis | 1440 |
| #14 | Other(s): | 1494 | Bash/Shell/PowerShell | 1305 |
| #15 | jQuery | 1456 | TypeScript | 1301 |

### Senior Executive/VP

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 1600 | JavaScript | 1202 |
| #2  | HTML/CSS | 1513 | Linux | 1155 |
| #3  | SQL | 1351 | HTML/CSS | 1066 |
| #4  | Linux | 1268 | SQL | 997 |
| #5  | MySQL | 1106 | Other(s): | 964 |
| #6  | AWS | 1046 | Docker | 957 |
| #7  | Bash/Shell/PowerShell | 986 | AWS | 936 |
| #8  | Python | 977 | Python | 913 |
| #9  | PostgreSQL | 937 | PostgreSQL | 886 |
| #10 | Node.js | 926 | Node.js | 859 |
| #11 | Other(s): | 911 | React.js | 778 |
| #12 | Windows | 900 | Redis | 726 |
| #13 | Docker | 885 | MySQL | 718 |
| #14 | jQuery | 875 | Android | 656 |
| #15 | Java | 766 | TypeScript | 655 |

### System Administrator

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 6558 | Linux | 6056 |
| #2  | HTML/CSS | 6480 | JavaScript | 4786 |
| #3  | Linux | 6304 | Python | 4595 |
| #4  | SQL | 6066 | HTML/CSS | 4402 |
| #5  | MySQL | 5341 | SQL | 4353 |
| #6  | Bash/Shell/PowerShell | 5218 | Docker | 4110 |
| #7  | Python | 4586 | Bash/Shell/PowerShell | 3780 |
| #8  | Windows | 4585 | PostgreSQL | 3601 |
| #9  | jQuery | 4003 | Other(s): | 3403 |
| #10 | PHP | 3840 | Node.js | 3377 |
| #11 | PostgreSQL | 3539 | MySQL | 3317 |
| #12 | Java | 3484 | Windows | 3095 |
| #13 | Docker | 3432 | AWS | 3051 |
| #14 | Other(s): | 3426 | Android | 2788 |
| #15 | Node.js | 3394 | Raspberry Pi | 2730 |

### Developer, Embedded Applications Or Devices

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Linux | 4708 | Linux | 4580 |
| #2  | JavaScript | 4413 | Python | 3609 |
| #3  | Windows | 4243 | JavaScript | 3098 |
| #4  | HTML/CSS | 4186 | C++ | 2927 |
| #5  | C++ | 3702 | Android | 2917 |
| #6  | SQL | 3694 | Windows | 2887 |
| #7  | Python | 3693 | HTML/CSS | 2679 |
| #8  | C | 3623 | Raspberry Pi | 2623 |
| #9  | Bash/Shell/PowerShell | 3432 | SQL | 2575 |
| #10 | MySQL | 3381 | Docker | 2495 |
| #11 | Java | 3207 | C | 2455 |
| #12 | SQLite | 2899 | Other(s): | 2413 |
| #13 | Android | 2878 | Node.js | 2385 |
| #14 | C# | 2859 | Bash/Shell/PowerShell | 2228 |
| #15 | jQuery | 2560 | C# | 2220 |

### Product Manager

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | JavaScript | 3024 | JavaScript | 2328 |
| #2  | HTML/CSS | 2900 | HTML/CSS | 2040 |
| #3  | SQL | 2557 | Linux | 1945 |
| #4  | MySQL | 2157 | SQL | 1877 |
| #5  | Linux | 2076 | Python | 1770 |
| #6  | Windows | 1953 | Node.js | 1695 |
| #7  | jQuery | 1768 | Docker | 1652 |
| #8  | Node.js | 1654 | React.js | 1492 |
| #9  | Python | 1598 | Other(s): | 1457 |
| #10 | Bash/Shell/PowerShell | 1571 | PostgreSQL | 1433 |
| #11 | PostgreSQL | 1491 | AWS | 1428 |
| #12 | PHP | 1458 | Android | 1389 |
| #13 | Other(s): | 1457 | Windows | 1389 |
| #14 | Java | 1429 | MySQL | 1373 |
| #15 | SQLite | 1410 | TypeScript | 1236 |

### Scientist

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | Python | 2513 | Python | 2397 |
| #2  | Linux | 2412 | Linux | 2345 |
| #3  | HTML/CSS | 1846 | Other(s): | 1469 |
| #4  | JavaScript | 1764 | TensorFlow | 1401 |
| #5  | Bash/Shell/PowerShell | 1730 | JavaScript | 1297 |
| #6  | Windows | 1688 | C++ | 1296 |
| #7  | SQL | 1599 | Docker | 1232 |
| #8  | C++ | 1496 | Bash/Shell/PowerShell | 1219 |
| #9  | MySQL | 1469 | SQL | 1186 |
| #10 | Other(s): | 1435 | Windows | 1125 |
| #11 | Java | 1262 | HTML/CSS | 1116 |
| #12 | C | 1230 | PostgreSQL | 1096 |
| #13 | SQLite | 1189 | Raspberry Pi | 1024 |
| #14 | PostgreSQL | 1078 | Pandas | 1017 |
| #15 | Docker | 1008 | MySQL | 981 |

### Marketing Or Sales Professional

| Rank | Haves | Counts | Wants | Counts |
|------|-------|--------|-------|--------|
| #1  | HTML/CSS | 749 | JavaScript | 575 |
| #2  | JavaScript | 700 | HTML/CSS | 551 |
| #3  | SQL | 575 | Python | 467 |
| #4  | MySQL | 561 | SQL | 463 |
| #5  | jQuery | 478 | MySQL | 449 |
| #6  | Windows | 433 | Other(s): | 428 |
| #7  | PHP | 431 | Node.js | 420 |
| #8  | Other(s): | 413 | React.js | 392 |
| #9  | Linux | 400 | Linux | 390 |
| #10 | Python | 373 | Android | 364 |
| #11 | WordPress | 373 | jQuery | 357 |
| #12 | Node.js | 341 | Windows | 328 |
| #13 | Java | 322 | PHP | 313 |
| #14 | Bash/Shell/PowerShell | 313 | PostgreSQL | 299 |
| #15 | SQLite | 308 | MongoDB | 299 |

## Some Observations

Keep in mind that these questions did *not* ask people their "top" or "main" technologies in each category. Everyone was free to select as many technologies as they wished to indicate as something they worked with in the year prior.

There was also no ranking of these technologies in the survey, just checkboxing.

Here are some of my personal observations of this data, in no particular order:

1. **HTML, CSS and JavaScript are incredibly popular.** I did not expect those technologies to show up in the top 5 as "haves" under not 50%, not 75%, but *every single one* of the developer types.
2. **Developer types that commonly work with web technologies** (designers, full-stack and front-end devs) ***want* to continue working with the same tech** in the subsequent year. In addition, QA devs and sysadmins also show similar wants, which  I found interesting. Oh, and people in less technical roles such as senior executives and product managers also rank web technologies highly in their "wants".
3. **jQuery appears in numerous "have" lists, barely in any "wants". React.js is the complete opposite.** I am aware that they are not directly competing libraries. I just thought it was an interesting observation. Angular only appears in the front-end devs' lists (#13 "have", #15 "want").
4. Developer types that rank Python highly in their "haves" tend to also rank Python in the top 1-2 "wants". I hope I'm not taking this the wrong way, but this tells me **people who work with Python really like it**. I also see that as much as Python is wanted, few people "have" it across the board compared to other tech.
5. Almost across the board, **Linux is ranked higher as a "want" than as a "have"** in the same category.
6. Almost across the board, Java often makes the top 15 cutoff as a "have" but not as a "want". **Many developer types work with Java today but would rather not in the subsequent year.** Notable exceptions to this are back-end developers (Java at #15 "want"), mobile developers (Java at #12 "want"), and students (Java at #10 "want"). Students also use Java a ton (#3 "have"), presumably in coursework.
7. While Windows and Linux appear as platforms throughout these top 15 lists, **macOS appears exactly 0 times**.
8. **Game developers rank Unity 3D much higher as a "want" than they do Unreal Engine.** However, this is likely due to prior experience; Unreal Engine does not make the top 15 "haves" list for them.
9. **SQL and relational database platforms appear quite evenly throughout the lists**, with no clear trends in SQL "wants" being higher than SQL "haves" or vice versa.

## The Script

As I mentioned near the top, the script isn't the cleanest. You can download the dataset from Stack Overflow [from here](https://insights.stackoverflow.com/survey). To make the script work with datasets from other years, you may need to modify column names as they appear to change from year to year.

<script src="https://gist.github.com/Antrikshy/e117f072192357c7e4d01df9bfb47737.js"></script>

## Your Turn

Anybody see fun stuff I may have missed in this data?

Did somebody *actually* read this blog post, download my script, and do other fun stuff with it?

Show me!
