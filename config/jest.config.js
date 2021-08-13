const ignore_arr = ["(<rootDir>/)(?=(node_modules|dist|public))"];

module.exports = {
  rootDir: "../",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      compiler: "typescript",
      tsConfig: "config/tsconfig.json",
      babelConfig: "config/.babelrc.json"
    }
  },
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ignore_arr,
  coveragePathIgnorePatterns: ignore_arr,
  setupFiles: [], // environment (.env) specific setup
  setupFilesAfterEnv: [], // test specific setup
  restoreMocks: true, // restore mock state before each state
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
};
