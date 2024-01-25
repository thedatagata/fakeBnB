# **FakeBnB Documentation**

### **Setting Up Your Development Environment** 

- [A web developers guide to setting up a new Mac](https://medium.com/@antmtrombetta/a-web-developers-guide-to-setting-up-a-new-mac-b6a86d10733a)

1. Run in Terminal: `brew install iterm2`
2. Run in Terminal: `brew install zsh`
3. Open up iTerm and run: `sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
4. Run in iTerm: `source ~/.zshrc`
5. Run in iTerm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
6. Run in iTerm: `open ~/.zshrc`
7. Download VS Code: [VS Code Download](https://code.visualstudio.com/download) 
8. [VS Code Extensions](https://medium.com/geekculture/5-vscode-extensions-tricks-to-speed-up-react-nextjs-development-workflow-1b3b5773840d)

- [Setting up NVM on Mac](https://medium.com/devops-techable/how-to-install-nvm-node-version-manager-on-macos-with-homebrew-1bc10626181)
1. Run in iTerm: `brew install nvm`
2. Run in iTerm: `mkdir ~/.nvm`
3. Run in iTerm: `echo "export NVM_DIR=~/.nvm\nsource \$(brew --prefix nvm)/nvm.sh" >> .zshrc`
4. Run in iTerm: `source ~/.zshrc`

- Install the node.js version used for this project
1. Run in iTerm: `nvm install 18.9.0`
2. Run in iTerm: `nvm use 18`

- [Next.js Installation Docs (Follow Manual Install)](https://nextjs.org/docs/getting-started/installation)

1. Run in iTerm: `npm install next@latest react@latest react-dom@latest`

- [Github SignUp](https://github.com/)

- [Set Up git for Mac](https://www.freecodecamp.org/news/setup-git-on-mac/)

- Create a folder on your computer for where you would like to create this project. I like having a folder on my desktop called WillowTree and then within that have folders for different sorts of projects. For instance, within the WillowTree folder on your desktop, you could create a learnNext folder, and within that you would run the following step where we'll clone the repo. 

1. Run in iTerm: `cd`
2. Run in iTerm: `mkdir WillowTree`
3. Run in iTerm: `cd WillowTree`
4. Run in iTerm: `mkdir learnNext`

- Clone the Repo for this project

1. Run in iTerm: `git clone https://github.com/thedatagata/fakeBnB.git`
2. If you run into any issues, checkout: [Github Authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)

- Finally, we will navigate into our project directory and install the project dependencies 

1. Run in iTerm: `cd fakeBnB`
2. Run in iTerm: `npm install`
3. Run in iTerm: `npm run dev`
4. Open up a browser and navigate to localhost:3000

