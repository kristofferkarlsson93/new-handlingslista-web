// Get categories from firebase maybe??
const categories = require('../../data/categories.json');
const groupBy = require('group-by');
// input: [{id: "", item: ""}]

export const groupByCategory = (items) => {
  const result = items.map(item => {
    const categoryMatchingOverrider = categories.categories.find(c => item.item.toLowerCase().includes(`${c.overrideMatcher.toLowerCase()}:`))
    if (categoryMatchingOverrider) {
      return {
        category: categoryMatchingOverrider.name,
        id: item.id,
        item: item.item.toLowerCase().replace(`${categoryMatchingOverrider.overrideMatcher.toLowerCase()}:`, '').trim()
      }
    }

    const matchingCategory = categories.categories.find(c => c.itemMatchers.some(m => item.item.toLowerCase().includes(m.toLowerCase())))
    if (matchingCategory) {
      return { category: matchingCategory.name, ...item }
    } else {
      return { category: 'Övrigt', ...item }
    }
  });

  return groupBy(result, 'category');

}