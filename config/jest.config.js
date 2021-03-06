const ignore_arr = ["(<rootDir>/)(?=(node_modules|dist|public))", "<rootDir>/src/index.ts"];

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
  collectCoverage: true,
  maxWorkers: "50%", // this can actually be faster than using 100% due to the time cost of allocating CPUs
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95
    }
  }
};
