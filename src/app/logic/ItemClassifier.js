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

    const bestMatchingCategory = findMostMatchingCategory(item);
    if (bestMatchingCategory) {
      return { category: bestMatchingCategory.category, ...item }
    } else {
      return { category: 'Övrigt', ...item }
    }
  });

  return groupBy(result, 'category');
}

const findMostMatchingCategory = (item) => {
  const matchResults = AllMatchersWithCategories.map(({ category, matcher }) => {
    const index = item.item.toLowerCase().indexOf(matcher.toLowerCase());
    const matchLength = index !== -1 ? matcher.length : 0;

    return { category, matcher, result: matchLength }
  })
     .filter(entry => entry.result >= 3) // Don't allow short matches.

  if (matchResults.length) {
    return matchResults.reduce((max, item) => // { category: 'Skafferi', matcher: 'tomatpuré', result: 9 }
       item.result > max.result ? item : max
    );
  }
  else return null
}

const AllMatchersWithCategories = categories.categories.flatMap(c => c.itemMatchers.map(m => ({
  category: c.name,
  matcher: m
})));