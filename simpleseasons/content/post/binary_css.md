---
title: Binary
subtitle: What is an Algorithm?
date: 2015-02-20
tags: ["binary","computers","math","css","html"]
---

An algorithm is a process that turns a set of inputs into a particular output. For cooks, a recipe is an algorithm that turns flour, sugar, and other raw ingredients into a cake or other food. For drivers, directions are algorithms that take someone from one location to another. 

People and computers have different strengths. People are capable of distinguishing between many different inputs, applying a roughly defined algorithm, and usually arriving at the correct output. Computers are capable of knowing whether inputs are on or off, applying a very precisely defined algorithm, and always (assuming correct inputs and algorithm) arriving at the correct output.

An addition algorithm is any method to turn two inputs into the sum. 


Computers store information as a collection of bits that are either on or off. Using 0 to represent off and 1 to represent on is common, but most people equate "10" with the base-10 value that is equal to the number of fingers most people have. While in binary, "10" represents the number of hands most people have.



Instead of numbers we are going to use colors and widths to avoid preconceived notions of what digits represent. Going forward, any digit or number will be standard base-10. When dealing with binary representations, gray (or white) will represent off while any other color will represent on.

Any information can be stored as a binary sequence. We are going to focus on representing numbers using only a sequence of colored squares. You should try to perform all of the operations without thinking about numbers.

How wide is the following block?

A human would count the number pixels or measure the length in inches and use a base-10 number, but how can a computer store that information using only on and off?

We can use a set of smaller blocks that will uniquely define the width by stating whether each block is required or not.


Click the blocks above to find a set that exactly matches the length of the black bar. Clicking a block arranges it just below the black bar for easy comparison. Clicking the block again removes it if you have gone too far.

For the above example, you hopefully determined that the green, red, blue, and purple blocks were required. Thus the width of the given black bar could be described by turning the bits for green, red, blue, and purple to on and all other bits off.

Each block is twice the size of the next smaller block, so no matter how wide the block is we can communicate its width in terms of yes or no regarding a defined set of smaller blocks.

Adding another block twice as long as the yellow block would allow for representing blocks that are twice as long. Therefore adding a small number of bits can greatly increase the amount of information that can be stored.

How do we convert this talk of green and red blocks into something that more organized? Instead of using colors and sizes to distinguish the blocks we use their location.

Width =

For blocks as small as  up to blocks almost as wide as your screen, we can represent its size with just six on or off bits.

Width =

To get a bit trickier, what is the length of this block? You're not going to be able to get the exact length using just the six blocks. There is going to be a bit left over that is too small to be covered by any of the six blocks, but get as close as you can.

Width =

To match the block exactly, we need to add a seventh block that is smaller.

Width = .

Just like we can add larger blocks to help represent wider blocks, we can also keep adding blocks that are half as wide to represent blocks that do not fit exactly.

Now that we know it is possible to record numbers using a sequence of on or off bits, why does this representation allow for the magic of computers? Computers can very quickly manipulate the information using logical algorithms.




