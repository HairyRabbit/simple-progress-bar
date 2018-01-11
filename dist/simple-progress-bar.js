'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var readline = _interopDefault(require('readline'));

/**
 * render a progress bar
 *
 * 
 */
class Bar {
  constructor(progress = 0, columns, char = '=', pad = ' ', stdout = process.stderr) {
    this._progress = void 0;
    this.stdout = void 0;
    this.columns = void 0;
    this.char = void 0;
    this.pad = void 0;
    //$FlowFixMe
    this.columns = columns || stdout && stdout.columns || 60;
    this._progress = progress;
    this.char = char;
    this.pad = pad;
    this.stdout = stdout;
  }
  /**
   * render a progress bar
   *
   * @TODO implement increment update
   * @TODO implement left and right side labels
   */


  render() {
    const {
      _progress: progress,
      columns,
      stdout,
      char,
      pad
    } = this;
    const left = Math.floor(progress * columns);
    const right = columns - left;
    const out = char.repeat(left) + pad.repeat(right);
    stdout.write(out); // stdout.write(' ' + (progress * 100).toFixed(2) + '%')

    return this;
  }
  /**
   * earse for rerender
   */


  earse() {
    const stdout = this.stdout;
    readline.clearLine(stdout, 0);
    readline.cursorTo(stdout, 0);
    return this;
  }

  get progress() {
    return this._progress;
  }

  set progress(val) {
    if (val > 1 || val < 0) {
      throw new Error('The progress should between 0 and 1.');
    } else if (this._progress !== val) {
      this._progress = val;
      this.earse().render();
    }
  }

}

exports['default'] = Bar;
