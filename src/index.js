const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

logger.info('Application started.');


function readDocument(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    const document = fs.readFileSync(path.resolve(filePath), 'utf-8');
    if (!document.trim()) {
      throw new Error('Document is empty');
    }

    return document;
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    return null;
  }
}

function convertToJSON(document) {
  if (!document) {
    throw new Error('Document content is empty');
  }

  const title = extractTitle(document);
  const entities = extractEntities(document);
  const summary = extractSummary(document);
  const outline = extractOutline(document);

  return JSON.stringify({
    title,
    entities,
    summary,
    outline
  }, null, 2);
}

function extractTitle(document) {
  const lines = document.split('\n').filter(line => line.trim());
  return lines.length > 0 ? lines[0].trim() : 'No Title Available';
}

function extractEntities(document) {
  const names = [...document.matchAll(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g)].map(match => match[0]);
  const dates = [...document.matchAll(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/g)].map(match => match[0]);
  const locations = [...document.matchAll(/\b(?:[A-Z][a-z]+\s?)+,?\s?[A-Z]{2}\b/g)].map(match => match[0]);

  return [...new Set([...names, ...dates, ...locations])] || []; // Return empty array if nothing is found
}

function extractSummary(document) {
  const lines = document.split('\n').filter(line => line.trim());
  if (lines.length === 0) return 'No content available for summary';

  let summary = 'This document is a ' + lines[0] + '. It includes the following sections:';
  const sections = document.split('\n\n');

  sections.forEach((section, idx) => {
    if (idx === 0) return; // Skip the title
    summary += ' ' + section.split('\n')[0].trim();

    if (idx < sections.length - 1) {
      summary += ',';
    }
  });

  summary += '.';
  return summary;
}

function extractOutline(document) {
  const sections = document.split('\n\n');
  const outline = {};

  sections.forEach((section, idx) => {
    if (idx === 0) return; // Skip the title

    const lines = section.split('\n').map(line => line.trim()).filter(line => line);
    if (lines.length > 0) {
      outline[`Section ${idx + 1}`] = lines;
    }
  });

  return outline;
}

// Main execution
const document = readDocument('./test/sample.txt');

if (document) {
  try {
    const jsonData = convertToJSON(document);
    console.log(jsonData);
  } catch (error) {
    console.error(`Error processing document: ${error.message}`);
  }
} else {
  console.error("Failed to read the document.");
}

module.exports = {
    readDocument,
    extractTitle,
    extractEntities,
    extractSummary,
    extractOutline,
  };