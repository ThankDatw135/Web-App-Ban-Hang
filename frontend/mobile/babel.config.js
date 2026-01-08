module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ],
  ],
};
