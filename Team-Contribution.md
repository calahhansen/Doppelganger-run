# The Titans Team Members:
Calah - Project Lead<br>
Nermin - Lead Designer<br>
Kong - Front End Developer<br>
Nolan - Back End Developer<br>
Jack - Back End Developer

# How Team Members Contribute to the Titan Project:
Branch Types:
Master branch (Production Environment - ONLY the Development branch will feed into this branch)
Development branch (all other branches feed into this branch for knitting/testing/reviewing/de-bugging)

# Steps for creating good pull requests:
Create my new branch

git checkout Development
git pull
git checkout -b my-new-branch-name
Make Changes (Repeat these steps until you are done with the work.)

git add .
git commit -m "my notes on changes"
When done with the coding work

git pull origin Development
Resolve Conflicts by repeating the following 2 steps

git add .
git commit -m "my notes and if co-authored with another team member"
If there are no conflicts
git push origin my-new-branch-name
Go to Github and make the pull request

In Github, another team member will accept all changes into the implementation branch and merge into development
Quality Control of Master Branch
In Github, the team requires 3 people to sign off on pull requests from development to master branch

To approve:
Pull the development
Run it yourself and look for bugs, issues, etc.
If issues/bugs found, then comment and decline pull request
If no issues, then approve! *The team will have one member assigned as the "daily de-bugger" It is highly recommended to ask for help as needed from other team members or TA's)
