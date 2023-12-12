# Salesforce DX Project: Getting Started

Welcome to your Salesforce DX project! This guide will help you set up your environment, work with Apex, and get the most out of your Salesforce DX project.

## Setting Up Your Local Environment

To start working with your Salesforce DX project, you'll need to set up your local development environment. Here's how:

1. **Install Salesforce CLI**: Download and install the Salesforce CLI (Command Line Interface) from [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm). The CLI is essential for executing Salesforce DX commands.

2. **Install Visual Studio Code**: For code editing and debugging, download and install Visual Studio Code (VS Code) from [here](https://code.visualstudio.com/). Also, install the Salesforce Extension Pack for VS Code available [here](https://developer.salesforce.com/tools/vscode/).

3. **Authenticate with Your Salesforce Org**: Use the Salesforce CLI to authenticate with your Salesforce Org. Run the following command and follow the login process:

```bash
sfdx auth:web:login -a <your-alias>
```


4. **Clone the Repository**: Clone this repository to your local machine using Git.

5. **Open the Project in VS Code**: Open the folder containing the cloned project in VS Code.

## Configure Your Salesforce DX Project

Your `sfdx-project.json` file is the heart of your project configuration. Refer to the [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) for detailed information.

## Working with Apex

Apex is Salesforce's proprietary programming language, optimized for building complex business logic within Salesforce.

- **Create Apex Classes**: Use VS Code to create and edit Apex classes. Navigate to your project's `force-app/main/default/classes` directory to manage your Apex code.

- **Run Apex Tests**: Ensure the reliability of your code by running Apex tests. Use the command:

```bash
sfdx force:apex:test:run -u <your-alias> -c -r human
```

to run tests in your default org.

- **Deploy Changes**: Use the CLI to deploy your changes to a Salesforce Org. Run:

```bash
sfdx force:source:deploy -p force-app -u <your-alias>
```


## Plan Your Deployment

Decide whether you're deploying a set of changes or creating a self-contained application. Consider the [development models](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Additional Resources

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
