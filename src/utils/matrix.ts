/**
 * Performs the following operation:
 * ```
 *   A       M_00, M_01, M_02       arr[0]
 * ( B ) = [ M_10, M_11, M_12 ] * ( arr[1] )
 *   C       M_20, M_21, M_22       arr[2]
 * ```
 * @param M 2D matrix that performs the conversion
 * @param arr Input array to convert
 * @returns A new array of values based on the matrix multiplication
 */
export function multiplyMatrix(M: number[][], arr: number[]): number[] {
  return [
    M[0][0] * arr[0] + M[0][1] * arr[1] + M[0][2] * arr[2],
    M[1][0] * arr[0] + M[1][1] * arr[1] + M[1][2] * arr[2],
    M[2][0] * arr[0] + M[2][1] * arr[1] + M[2][2] * arr[2]
  ];
}
