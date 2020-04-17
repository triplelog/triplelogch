---
title: Binary Representations
subtitle: Why numbers?
date: 2015-02-20
tags: ["binary","computers","math","css","html","numbers"]
---


For purposes of this discussion, assume that neither $2 bills nor $50 bills exist: only $1, $5, $10, $20, and $100. Which of these piles of bills is worth more?



Now consider a slightly different scenario. Each pile is required to use the fewest possible bills to represent its value. So $67 must consist of 3 $20 bills, a $5 bill, and 2 $1 bills. In this scenario, there is exactly one way to represent any integer value. Which of these piles of bills is worth more?

There are good reasons why currency cannot be forced to have unique representations. Imagine if buying anything required not just exact change but a very specific representation of that value. However in math, we can just create the values on demand so requiring uniqueness makes sense.

Suppose 200 farmers each have a different amount of apples. We would like to be able to communicate how many apples each farmer has. There are infinitely many ways to do this and all that is necessary is that everyone agrees on the same system so that there is no confusion. 

If we had to design a system from scratch, we would need to consider what characteristics would make one system better than another. The three most important considerations are that it is easy to learn, easy to compare quantities, and easy to write down or say. An additional consideration would be that it is easy to perform basic computations like addition and multiplication, but for now we will ignore that.

One possible system is to assign unique symbols/sounds to each quantity. If we had 26 different quantities we could use the alphabet because most people have already memorized the order. However, memorizing the order of every symbol quickly becomes impractical if there are hundreds (or billions) of unique symbols.

Another system is to use something like tally marks or another method such that larger or more complex symbols represent larger quantities. It is easy to see that IIIIIIIIIII is larger than IIIII, but writing down these symbols for large numbers becomes unwieldy.

The Romans realized that instead of writing lots of tallies they could use a different letter to represent a certain number. Thus IIIII became V and IIIIIIIIII became X. Now they could write any number up to 50 with the longest possible string being XXXXVIIII. Comparing quantities is as simple as remembering that X>V>I and counting how many of the largest letter there are.

Arabic numerals decided to use location to represent large numbers. Digits farther to the left are worth more. The advantage is that there is a cap to the number of symbols to memorize. Knowing that 9>8>...>0 and digits to the left are worth 10 times as much allows for easy comparisons of any number. For Roman numerals, representing numbers like 10000000000000000 would require either lots of M's or new letters for each progressively larger value. 


Quick comparisons are important so it easy good to have as specific a system as possible. Using currency to denote value suffers from a lack of consistency and uniqueness. Imagine that people were only allowed to pay with the largest denominations

Roman numerals have the advantage that zeroes are not needed to indicate value. So 1000 is simply M. The downside is that 



A system that requires less memorization than unique symbols and less writing than the tick marks would be much better. If we use two characters instead of one then we only need to memorize the order of the 26 letters and can represent the order of more than 500 blocks. Order the blocks in alphabetical order so that block DG is larger than block BT. Look at which block has the larger first character, and if they are tied then look at which block has the larger second character.

Using 26 letters is a lot to memorize so math usually uses 10 digits. Allowing unlimited characters, an unlimited number of lengths can be ordered with just memorizing the order of the 10 digits. A short string of numbers represents so many possible lengths that we rarely need long strings.


