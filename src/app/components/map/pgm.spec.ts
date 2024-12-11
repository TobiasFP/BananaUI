import { pgmP5Tools } from './pgmP5Tools';

describe('pgm', () => {
  it('should extract number', () => {
    const pgmData = `P5
# Created by GIMP version 2.10.30 PNM plug-in
480 480
255
test
`;
    const pgmInfo = new pgmP5Tools(pgmData);
    expect(pgmInfo.isP5Format()).toBeTruthy();
    expect(pgmInfo.getHeight()).toBe(480);
    expect(pgmInfo.getWidth()).toBe(480);
    expect(pgmInfo.getDepth()).toBe(255);
  });
});
