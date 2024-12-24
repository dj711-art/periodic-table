const data = require('./periodic-table.json');

const validateElement = (element) => {
  const requiredFields = [
    'number', 'symbol', 'name', 'category', 'atomic_mass', 'x', 'y',
    'electron_configuration', 'color', 'phase', 'density', 'melting_point', 'boiling_point'
  ];

  for (const field of requiredFields) {
    if (!element.hasOwnProperty(field)) {
      return false;
    }
  }

  if (typeof element.number !== 'number' || element.number <= 0) {
    return false;
  }

  if (typeof element.atomic_mass !== 'number' || element.atomic_mass <= 0) {
    return false;
  }

  // Add more specific validations as needed

  return true;
};

test('validate all elements in periodic table', () => {
  expect(Array.isArray(data.elements)).toBe(true);

  for (const element of data.elements) {
    expect(validateElement(element)).toBe(true);
  }
});