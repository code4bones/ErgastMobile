module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.json',
        ],
        alias: {
          src:'./src',
          navigators:'./src/navigators',
          components:'./src/components',
          screens:'./src/screens',
          system:'./src/system',
          styles:'./src/styles'
        },
      },
    ],
  ],  
};
