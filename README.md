# React Native Recipe App

| Android  |
|---|
| <img src="https://github.com/user-attachments/assets/eebf3661-0748-42df-aa6f-8b7e93b4337e" width="600" /> |

| iOS  |
|---|
| <img src="https://github.com/user-attachments/assets/851b3631-e904-4d0c-9d47-a60d9cc5a0b2" width="600" /> |

## Description
### Chat Tab:
- Allows users to search for recipes by name, either by typing or using voice control.
- Displays a list of recipes based on the search query.
- When a user selects a recipe, the recipe's instructions and ingredients are loaded.

### Recipe Tab:
- Similar to the Chat tab, but recipe details are displayed on a separate screen.

### Common Features:
- Both tabs include an option to view either the instructions or ingredients.
- Users can check off steps one by one as they follow the recipe.

## Main Libraries Used
| Library  |  Used for |
|---|---|
| `@react-native-async-storage/async-storage`  |  For local storage. Used with redux. |
|  `@react-native-voice/voice`  |  Used for speech detection. |
| `@react-navigation/bottom-tabs`  |  Used for showing bottom tabbar. |
| `axios`  |  Used for api calls. |
| `redux`  |  Used for global state management |
| `lottie`  |  Used for prebuild static animations |
| `react-native-config`  |  Used to store environment variables |
| `react-native-paper`  |  Used for prebuilt material components |
| `react-native-vector-icons`  |  Used for icons |
| `eslint`  |  Used for linting the code |
| `react-native-restart`  |  Used to restart app in case of crash |
| `react-native-size-matters`  |  Used for moderate scaling fonts and sizes |


## Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
