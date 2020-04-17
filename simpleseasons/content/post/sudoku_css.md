---
title: Sudoku with CSS
subtitle: Games without Javascript?
date: 2015-02-20
tags: ["sudoku","games","css","html"]
---

Is it possible to create a Sudoku game using just HTML and CSS? Although just about any other method would be better, it is true that Sudoku does not require Javascript or any server-side help. Why would anyone avoid Javascript if they want to build an interactive webpage? There is no good reason, but it is a fun (depending on your definition of fun) and potentially beneficial exercise if your goal is to reduce your site's dependency on Javascript, JQuery, server calls, etc. 

Creating an interactive web page with just HTML and CSS is like a magic trick. If you see how it is done, then you will probably be disappointed by its simplicity. There is a lot of deception by placing smoke and lots of mirrors in just the right places. If you try to figure out how things are done on your own it will be much more satisfying. 

Learn how I made Sudoku and then try to create your own projects with just CSS.









# Automatically Detect Duplicates




# Add Some Color

Now that we have a working game we can add some fancy features.


# Fade Depleted Numbers

At some point a 1 will be in each row, each column, and each 3x3 block. To help the user it would be nice to indicate that they no longer need to look for where to place the number 1. We have prevented duplicates so we just need to check that nine 1's have been checked. If there is a class that consists of exactly the set of cells that contain 1's then we just need to be able to detect when nine cells of this class have been checked.


# Congratulate Winners

If someone completes the puzzle, it would be nice to give them a congratulatory message rather than simply doing nothing. How can we detect that the puzzle has been completed? The good news is that we have prevented any duplicates so we just need to know that every cell has been filled in. But there are so many possibilities. How would you check that 81 cells have been checked?

We are already tracking when each number has been fully depleted, so maybe we can use this information. The problem is that it is easy to display a different color when each number is depleted but that information is not stored in a manner that can accessed. There is no way for CSS to know whether the 1 cell has been faded. And there is no way to combine information about 1's and 2's because they are in different parent elements.

How can we use CSS to display different elements depending on the number of numbers that have been depleted? The best way to use CSS to do something like addition is to make a new block visible each time we want to add one. As more numbers 


# Random Game

The final piece is to create the random puzzle button. CSS cannot generate random numbers, so we are going to have to create something that seems random. We make the button seem like it is one button, but really it is 100 buttons. The randomness comes from where on the button the user clicks. If you click in the exact same place each time, it is not random. But most users would never realize the lack of true randomness.

For even more randomness, we could animate the button so that the destination changes every hundredth of a second. However, animations do not seem to work the way they should in every browser - I couldn't get Safari? to animate like I wanted.





