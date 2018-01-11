/**
 * render a progress bar
 *
 * @flow
 */

import readline from 'readline'

export default class Bar {
  _progress: number;
  stdout: *;
  columns: number;
  char: string;
  pad: string;

  constructor(progress?: number = 0,
              columns?: number,
              char?: string = '=',
              pad?: string = ' ',
              stdout?: * = process.stderr) {
    //$FlowFixMe
    this.columns = columns || stdout && stdout.columns || 60
    this._progress = progress
    this.char = char
    this.pad = pad
    this.stdout = stdout
  }

  /**
   * render a progress bar
   *
   * @TODO implement increment update
   * @TODO implement left and right side labels
   */
  render() {
    const { _progress: progress, columns, stdout, char, pad } = this
    const left = Math.floor(progress * columns)
    const right = columns - left
    const out = char.repeat(left) + pad.repeat(right)
    stdout.write(out)
    // stdout.write(' ' + (progress * 100).toFixed(2) + '%')
    return this
  }

  /**
   * earse for rerender
   */
  earse() {
    const stdout = this.stdout
    readline.clearLine(stdout, 0)
    readline.cursorTo(stdout, 0)
    return this
  }

  get progress(): * {
    return this._progress
  }

  set progress(val: number) {
    if(val > 1 || val < 0) {
      throw new Error('The progress should between 0 and 1.')
    } else if(this._progress !== val) {
      this._progress = val
      this.earse().render()
    }
  }
}
