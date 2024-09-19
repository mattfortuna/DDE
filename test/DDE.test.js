const fs = require('fs');
const path = require('path');
const { readDocument, extractTitle, extractEntities, extractSummary, extractOutline } = require('../src/index'); 

describe('Document Extraction', () => {

  test('readDocument should throw an error if file does not exist', () => {
    const filePath = './nonexistent.txt';
    const doc = readDocument(filePath);
    expect(doc).toBeNull();
  });

  test('extractTitle should return the first line as title', () => {
    const document = `Title Line\n\nSome content`;
    const title = extractTitle(document);
    expect(title).toBe('Title Line');
  });

  test('extractEntities should return extracted names, dates, and locations', () => {
    const document = `John Doe met Jane Doe on 12/05/2020 in New York, NY.`;
    const entities = extractEntities(document);
    expect(entities).toEqual(expect.arrayContaining(['John Doe', 'Jane Doe', '12/05/2020', 'New York, NY']));
  });

  test('extractSummary should return a valid summary', () => {
    const document = `Title Line\n\nSection 1\nContent\n\nSection 2\nContent`;
    const summary = extractSummary(document);
    expect(summary).toContain('This document is a Title Line');
    expect(summary).toContain('It includes the following sections: Section 1, Section 2.');
  });

  test('extractOutline should return a structured outline', () => {
    const document = `Title Line\n\nSection 1\n- Point 1\n- Point 2\n\nSection 2\n- Point 1\n- Point 2`;
    const outline = extractOutline(document);
    expect(outline).toEqual({
      "Section 2": ["Section 1", "- Point 1", "- Point 2"],
      "Section 3": ["Section 2", "- Point 1", "- Point 2"]
    });
  });
});
