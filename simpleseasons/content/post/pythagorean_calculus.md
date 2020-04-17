---
title: Calculus and Pythagorean Expectation
subtitle: Marginal Runs and Wins
date: 2018-11-05
tags: ["example", "math"]
---


The Pythagorean expectation is a predicted winning percentage based on runs scored and runs allowed. For baseball and football the following formula provides a good approximation of a team winning percentage:

$$\text{win\%} \approx \frac{rs^2}{rs^2+ra^2}$$

Better approximations can be made by adjusting the exponent so the following formulas are more accurate:

$$\text{win\%(MLB)} \approx \frac{rs^{1.8}}{rs^{1.8}+ra^{1.8}}$$
$$\text{win\%(NFL)} \approx \frac{ps^{2.3}}{ps^{2.3}+pa^{2.3}}$$

Simple arithmetic of dividing numerator and denominator by the numerator yields the equivalent formula:

$$\text{win\%} \approx \frac{1}{1+(\frac{ra}{rs})^2}$$

This formula directly above is the formula we are going to analyze for now, but any of the formulas above work the same with Calculus. The first question we want to answer is whether a team should improve its offense or defense. 

This question is sport-neutral so to improve an offense a team could sign a good batter, quarterback, three-point shooter, or goal-scorer. To improve a defense a team could sign a good pitcher, linebacker, shot-blocker, or goal-keeper. Not every signing will provide a linear increase in points scored or decrease in points allowed, but for our purposes a team has computed the expected advantages for their team and concluded that spending $1 million on offense increases points by x and spending $1 million on defense decreases points by x. 

More complicated analysis can be performed if there is not perfect equality, but this assumption is not terrible. In baseball, generally players and pitchers are valued based on WAR which is based on runs added or subtracted from some league average replacement. Good hitters tend to be even more valuable on good offenses than bad offenses.

https://www.fangraphs.com/tht/ops-for-the-masses/

## The No Calculus Approach

In terms of additional winning percentage, what is the value of one additional run scored? The answer depends on the team. Subtract the expected winning percentage of the original team from the expected winning percentage of the team with one additional run.

$$\Delta\text{win\%} \approx \frac{1}{1+(\frac{ra}{rs+1})^2}-\frac{1}{1+(\frac{ra}{rs})^2}$$

Similarly, the value of allowing one fewer run is this messy equation:

$$\Delta\text{win\%} \approx \frac{1}{1+(\frac{ra-1}{rs})^2}-\frac{1}{1+(\frac{ra}{rs})^2}$$

When is scoring an additional run more valuable than allowing one fewer run? That question is answerable by thinking about when adding one to the denominator is smaller than subtracting one from the numerator. But more complicated analysis of knowing the relative changes requires redoing the entire computation for each possibility.

## Using Calculus

In terms of additional winning percentage, what is the value of one additional run scored? This question is about marginal increases so a derivative is a perfect tool. The derivative of winning percentage with respect to runs scored is a good approximation of the change in winning percentage divided by the change in runs scored. What is the derivative? Apply either the quotient rule or chain rule with respect to the variable rs.

$$\frac{d}{drs}[\text{win\%}] \approx \frac{2\cdot rs\cdot ra^2}{(rs^2+ra^2)^2}$$

