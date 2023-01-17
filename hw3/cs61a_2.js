//HW 2//
//1st question//
function make_repeater(func, n){
    /*
        Return the function that computes the nth application of func.

    >>> add_three = make_repeater(increment, 3)
    >>> add_three(5)
    8
    >>> make_repeater(triple, 5)(1) # 3 * 3 * 3 * 3 * 3 * 1
    243
    >>> make_repeater(square, 2)(5) # square(square(5))
    625
    >>> make_repeater(square, 4)(5) # square(square(square(square(5))))
    152587890625
    >>> make_repeater(square, 0)(5) # Yes, it makes sense to apply the function zero times!
    5
    */
    // *** YOUR CODE HERE ***
    function base(x) {
        m = n;
        a = x;
        while (m > 0) {
           a = func(a);
           m --;
        }
      return a;
    }
    return base;
}


function num_eights(pos){
    /* Returns the number of times 8 appears as a digit of pos.

    >>> num_eights(3)
    0
    >>> num_eights(8)
    1
    >>> num_eights(88888888)
    8
    >>> num_eights(2638)
    1
    >>> num_eights(86380)
    2
    >>> num_eights(12345)
    0
    >>> from construct_check import check
    >>> # ban all assignment statements
    >>> check(HW_SOURCE_FILE, 'num_eights',
    ...       ['Assign', 'AugAssign'])
    True
    */
    // *** YOUR CODE HERE ***
    if (pos < 10 && pos != 8) {
        return 0;
    } else if(pos % 10 == 8) {
        return num_eights(Math.floor(pos /10)) + 1;
    } else {
        return num_eights(Math.floor(pos /10));
    }
}

function pingpong(n){
    /*
        Return the nth element of the ping-pong sequence.

    >>> pingpong(8)
    8
    >>> pingpong(10)
    6
    >>> pingpong(15)
    1
    >>> pingpong(21)
    -1
    >>> pingpong(22)
    -2
    >>> pingpong(30)
    -2
    >>> pingpong(68)
    0
    >>> pingpong(69)
    -1
    >>> pingpong(80)
    0
    >>> pingpong(81)
    1
    >>> pingpong(82)
    0
    >>> pingpong(100)
    -6
    >>> from construct_check import check
    >>> # ban assignment statements
    >>> check(HW_SOURCE_FILE, 'pingpong', ['Assign', 'AugAssign'])
    True
    */
    // *** YOUR CODE HERE ***
    function helper(value, index, factor) {
        if (index >= n) {
            return value;
        }
        if (index % 8 == 0 || num_eights(index) != 0) {
            return helper(value + factor * (-1), index + 1, factor * (-1));
        }
        return helper(value + factor, index + 1, factor);
    }
    return helper(1, 1, 1)
}

function missing_digits(n){
    /* Given a number a that is in sorted, increasing order,
    return the number of missing digits in n. A missing digit is
    a number between the first and last digit of a that is not in n.
    >>> missing_digits(1248) # 3, 5, 6, 7
    4
    >>> missing_digits(19) # 2, 3, 4, 5, 6, 7, 8
    7
    >>> missing_digits(1122) # No missing numbers
    0
    >>> missing_digits(123456) # No missing numbers
    0
    >>> missing_digits(3558) # 4, 6, 7
    3
    >>> missing_digits(35578) # 4, 6
    2
    >>> missing_digits(12456) # 3
    1
    >>> missing_digits(16789) # 2, 3, 4, 5
    4

    >>> missing_digits(4) # No missing numbers between 4 and 4
    0
    >>> from construct_check import check
    >>> # ban while or for loops
    >>> check(HW_SOURCE_FILE, 'missing_digits', ['While', 'For'])
    True
    */
    // *** YOUR CODE HERE ***
    function helper(n, count) {
        let all_but_last = Math.floor(n/10);
        let last = n%10;
        if (all_but_last == 0) {
            return count;
        }
        if (last > all_but_last % 10) {
            count += (last - (all_but_last % 10) - 1);
        }
        return helper(all_but_last, count);
    }
    return helper(n, 0);
}


function get_next_coin(coin){
    /* Return the next coin. 
    >>> get_next_coin(1)
    5
    >>> get_next_coin(5)
    10
    >>> get_next_coin(10)
    25
    >>> get_next_coin(2) # Other values return None
    */
    // *** YOUR CODE HERE ***
    if (coin == 1) {
        return 5;
    }
    else if (coin == 5) {
        return 10;
    }
    else if (coin == 10) {
        return 25;
    } else {
        return None;
    }
}

function count_coins(change){
    /* Return the number of ways to make change using coins of value of 1, 5, 10, 25.
    >>> count_coins(15)
    6
    >>> count_coins(10)
    4
    >>> count_coins(20)
    9
    >>> count_coins(100) # How many ways to make change for a dollar?
    242
    >>> from construct_check import check
    >>> # ban iteration
    >>> check(HW_SOURCE_FILE, 'count_coins', ['While', 'For'])                                          
    True
    */
    // *** YOUR CODE HERE ***
    function count_partitions(n, m) {
        if (n == 0) {
            return 1;
        }
        else if (n < 0) {
            return 0;
        }
        else if (m == 0) {
            return 0;
        }
        else if (m == 25) {
            return count_partitions(n-m, m) + count_partitions(n, 10);
        } else if(m == 10) {
            return count_partitions(n-m, m) + count_partitions(n, 5);
        }
        return count_partitions(n-m, m) + count_partitions(n, Math.floor(m/5));
    }

    function highest_number(x) {
        if(x < change) {
            if (x <= 5) {
                return highest_number(x * 5);
            } else if (5 < x <= 10) {
                return highest_number(10);
            } else if (x > 10){
                return highest_number(25);
            }
        } else if (x >= 10){
            return 10;
        } else if (5 < x < 10){
            return 5;
        } else {
            return 1;
        }
    }

    return count_partitions(change, highest_number(1));

}
