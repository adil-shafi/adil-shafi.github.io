# Disease Prediction Webpage

This project is a web-based disease prediction tool that uses Naïve Bayes Algorithm to predict the likelihood of different diseases based on the user's inputs. There are various prediction models, with the Multiple Disease Predictor (MDP) as the most advanced tool that can predict four diseases simultaneously. The MDP is the final iteration of the project that implements all of the experimentation and development processes from the other predictors to create a smooth and highly advanced version. The MDP would be a great place to start testing the functionality of the work that has been developed.


### Table of Contents
- [Installation](#Installation)
- [Features](#Features)
- [Usage](#Usage)
- [Technologies Used](#Technologies-Used)
- [Future Improvements](#Future-Improvements)



### Installation
The website is currently running on GitHub Pages at [adil-shafi.github.io/index.html](https://adil-shafi.github.io/)
This is a fairly new way of hosting the website and in the event there are issues, below are instructions on loading the files into VSCode with the required extensions.

#### Visual Studio Code
[Download VS Code](https://code.visualstudio.com/download)

Then download the zip folder containing the contents of the project including the html, js, csv and css files.

Drop the files into a workspace on VS Code.

Head over to the Extensions marker in VS Code and download and install the Live Server by Ritwick Dey by searching for Live Server, it should be the first one.

![LiveServer](https://github.com/user-attachments/assets/f0ed9caf-9194-4c37-a2fb-265eb33e2a4b)



Right-click on index.html in the workspace and click on Open with Live Server. This should open index.html in your browser where you should be able to navigate the webpage as intended.



![OpenLiveServer](https://github.com/user-attachments/assets/418ebe1b-38da-471d-9bd8-b86f2eda0304)



### Features

Key Features of the MDP include:
-	Getting results for 4 different diseases simultaneously with aesthetically pleasing colours that correspond to the severity of the probability output
-	Recommendations on how to potentially lower your risk having certain diseases
-	Function to print only the user input and the results of the disease predictions
-	Switching themes which brings a new vivid and dynamic feel to the website
-	Tooltip question marks to help users understand some of the medical wording used


### Technologies Used
HTML was used for structuring the webpage including the form tables, navigation bar, buttons and more.

CSS was used for styling the web pages and to add animations and media to the pages. There is a lot of CSS styling used for aesthetically coordinated themes. The final iteration of the webpage uses 2 styling files to implement a sort of light/dark mode to the webpage.

JavaScript was the main programming language used for implementing the logic prediction and interactions throughout the website.

The Naïve Bayes Algorithm was the main algorithm of choice as it was perfect for probability calculations for diseases. Its simplicity and effectiveness allowed me to build multiple models from scratch.



### Future Improvements
The project is complete and could be further modified by adding more datasets with different diseases. As more medically researched data becomes available this project is able to handle and make predictions using Naïve Bayes with minimal changes to the codebase.

Body Mass Index (BMI) was an attribute that was found in most of the datasets used but was excluded from being used for calculations as it was found that BMI is subjective data. It's highly possible for 2 different individuals to have the same BMI but with completely different lifestyle choices and fat/muscle ratio that dictate their health. For this reason, it was excluded and attributes that the average person was more likely to have knowledge of were used.

