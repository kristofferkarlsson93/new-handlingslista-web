import { groupByCategory } from '../ItemClassifier';

describe('ItemClassiferi', () => {
  it('should add category "övrigt" when it can not find a match', () => {
    const input = [{ id: 'a', item: 'bldkjlkfgj' }]
    expect(groupByCategory(input)).toEqual({ 'Övrigt': [{ id: 'a', item: 'bldkjlkfgj', category: 'Övrigt' }] })
  });

  it('should classify kålrot as Frukt och grönt', () => {
    const input = [{ id: 'a', item: 'kålrot' }]
    expect(groupByCategory(input)).toEqual({
      'Frukt & grönt': [{
        id: 'a',
        item: 'kålrot',
        category: 'Frukt & grönt'
      }]
    })
  });

  it('should classify kålrot as Frukt och grönt and kyckling as Kött', () => {
    const input = [{ id: 'a', item: 'kålrot' }, { id: 'b', item: 'kyckling' }]
    expect(groupByCategory(input)).toEqual({
      'Frukt & grönt': [{ id: 'a', item: 'kålrot', category: 'Frukt & grönt' }],
      "Kött": [{ id: 'b', item: 'kyckling', category: 'Kött' }]
    });
  });

  it('should not care about case', () => {
    const input = [{ id: 'a', item: 'Kräm fräsh' }] // in the json `kräm` is lowercase
    expect(groupByCategory(input)).toEqual({ 'Mejeri': [{ id: 'a', item: 'Kräm fräsh', category: 'Mejeri' }] });
  });

  it('should classify item "grönt: Kött" as Frukt och grönt', () => {
    const input = [{ id: 'a', item: 'grönt: köttbullar' }]
    expect(groupByCategory(input)).toEqual({
      'Frukt & grönt': [{
        id: 'a',
        item: 'köttbullar',
        category: 'Frukt & grönt'
      }]
    })
  })
})