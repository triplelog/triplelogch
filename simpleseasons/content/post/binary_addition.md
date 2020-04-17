---
title: Binary Addition
subtitle: How do computers add?
date: 2015-02-20
tags: ["binary","computers","math","css","html"]
---

For purposes of this discussion, assume that neither $2 bills nor $50 bills exist: only $1, $5, $10, $20, and $100. Which of these piles of bills is worth more?



Now consider a slightly different scenario. Each pile is required to use the fewest possible bills to represent its value. So $67 must consist of 3 $20 bills, a $5 bill, and 2 $1 bills. In this scenario, there is exactly one way to represent any integer value. Which of these piles of bills is worth more?

There are good reasons why currency cannot be forced to have unique representations. Imagine if buying anything required not just exact change but a very specific representation of that value. However in math, we can just create the values on demand so requiring uniqueness makes sense.

If people could write 437 as 3(13)7 or 5(-7)(7) then comparing values would be much more difficult. Each of these numbers is the same: 4*100+3*10+7=3*100+13*10+7=5*100-7*10+7. Instead of looking at the first digit, the entire number would need to be considered. Allowing for any number in any place makes addition and subtraction very simple.

If we go back to the money. Adding the first two piles is as simple as pushing all the bills together. Adding the second two piles requires converting 5 $1 bills in $5 bills, etc. The 

The addition algorithm is really an algorithm for converting bad numbers into the proper, unique representation. 


# What is an algorithm?

An algorithm is a process that turns a set of inputs into a particular output. For cooks, a recipe is an algorithm that turns flour, sugar, and other raw ingredients into a cake or other food. For drivers, directions are algorithms that take someone from one location to another. 

People and computers have different strengths. People are capable of distinguishing between many different inputs, applying a roughly defined algorithm, and usually arriving at the correct output. Computers are capable of knowing whether inputs are on or off, applying a very precisely defined algorithm, and always (assuming correct inputs and algorithm) arriving at the correct output.

# What is addition?

If we take this block: and add this block: , how wide is the resulting block? A person can just physically combine the blocks to visualize the sum without thinking about numbers. A computer needs to store the width of each block as a string of 0's and 1's and then apply a precise algorithm to compute the sum.

First, we need to understand what binary means in terms of widths of blocks.




# Addition Algorithms


Addition algorithms are really algorithms for converting numbers that are not in the proper format into numbers that are. So 1001+1101 is really as simple as converting 2102 into only 0's and 1's. Since the input numbers will be just 0's and 1's, if we add two numbers then the output will be 0's, 1's, and 2's.

We need an algorithm to eliminate every 2. We know that 2 in one place is the same as 1 in the place to the left. Some 2's are easy to eliminate. If there is a 0 to the left of the 2 then we can turn that 0 into a 1 and the 2 into a 0. Thus 2102=2110 in modified binary. If the 2 is in the farthest left place, then add a 1 to the left and turn the 2 into a 0.
Thus 2110=10110. Once there are no more 2's we have the answer so 1001+1101=10110.

If the place to the left of a 2 is actually a 1 then we need to turn the 1 into a 2 and the 2 into a 0. So 1012=1020. Then the 2 has a 0 to its left so we replace that 0 with a 1. Thus 1020=1100. If there are a string of 1's to the left of a 2 this process gets repeated multiple times. So 101112=101120=101200=102000=110000. Every 1 gets turned into a 2 and then becomes a 0. Eventually a 0 appears and that becomes a 1. So we could skip lots of steps and let 10111111112=11000000000. All of the 1's and the final 2 become 0 and the 0 to the left becomes a 1.

What if we run into another 2 in this process? What is 10212? If we try to eliminate the 2 on the right first then we get 10212=10220=10300? What do we do with the 3? Just remember that 3 of something is the same as 1 of that thing and 1 of something twice the size so 03=11 in modified binary. Thus any 3 can be replaced with a 1 and the place to left adds 1. Therefore 10300=11100.

Is there any way to avoid using 3's? If we instead work left to right removing 2's then 10212=11012=11100. We get the same answer and never deal with any 3's. 

There are at least two algorithms. Remove 2's from the right by dealing with 3's as they appear or remove 2's from the left. As long as every conversion keeps everything equal the algorithm does not matter. You can start in the middle if you desire. Just keep going until there are no more digits other than 0 or 1. If you add multiple numbers like 1101+1001+1011+1111 you might end up with digits larger than 2 in which case just use the proper equivalence. A 4 is the same as a 2 one place to the left which is the same as a 1 two places to the left so you can let 004=020 and then remove the 2 or you can let 004=100. Or you can let 004=012 because removing 2 from the right place and adding 1 to the place to the left does not change the value.

# What about just one digit?

What is the sixth digit from the right of 100211012? One way to answer this question is to use one of the above algorithms and see what the answer is. But what if that is all that matters? We know the 2 will become a 0, but the question is whether a 1 will carry over into that slot. Look to the right. If it is a 1, then there could be a carry or not. If it is a 2, then there is definitely a carry. If it is a 0, then there is definitely not a carry. So we keep looking until there is something other than a 1. If the next non-1 is a 0, then no carry. If the next non-1 is a 2, then carry. 

# What about just one digit in base 10?

What is the sixth digit from the right of 100299541? One way to answer this question is to use one of the above algorithms and see what the answer is. But what if that is all that matters? The question is whether a 1 will carry over into that slot to turn the 2 into a 3. Look to the right. If it is a 9, then there could be a carry or not. If it is less than 9, then there is definitely no carry. If it is greater than 9, then there is definitely a carry. So we keep looking until there is something other than a 9. If the next non-9 is a smaller, then no carry. If the next non-9 is larger, then carry. 


# What about base 10 addition?

1234+2578=37(10)(12). 10 in any place can be replaced with a 0 and adding 1 to the digit to the left. So 37(10)(12)=380(12)=3812.






