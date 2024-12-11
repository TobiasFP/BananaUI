export class pgmP5Tools {
  _data: string;
  lines: string[];
  constructor(data: string) {
    this._data = data;
    const lines = data.split('\n');
    // Make sure we sort out comments
    this.lines = lines.filter((line) => {
      return line[0] !== '#';
    });
  }
  isP5Format(): boolean {
    return this.lines[0] == 'P5';
  }
  getHeight(): number {
    return Number(this.lines[1].split(' ')[0]);
  }
  getWidth(): number {
    return Number(this.lines[1].split(' ')[1]);
  }
  getDepth(): number {
    return Number(this.lines[2]);
  }
}
