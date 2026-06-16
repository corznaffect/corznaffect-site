import React, { useState, useMemo, useEffect } from 'react';
import { Coffee, Sandwich, UtensilsCrossed, Apple, GlassWater, Plus, Minus, X, ShoppingCart, FileText, Check, ChefHat, Filter, Star, Camera, ArrowLeft, Trophy, TrendingDown, Equal } from 'lucide-react';

const PHASES = {
  bulk: { id: 'bulk', label: 'Bulking', subtitle: 'Build muscle, gain size', range: '2,500–4,500 cal/day', scale: 1.4, mealRange: '600–1000 cal', snackRange: '200–500 cal', drinkRange: '400–1000 cal', icon: Trophy, defaultGoals: { cal: 3200, p: 200, c: 380, f: 95 } },
  maintain: { id: 'maintain', label: 'Maintaining', subtitle: 'Hold current physique', range: '2,000–3,000 cal/day', scale: 1.0, mealRange: '500–800 cal', snackRange: '150–400 cal', drinkRange: '200–500 cal', icon: Equal, defaultGoals: { cal: 2400, p: 170, c: 260, f: 80 } },
  cut: { id: 'cut', label: 'Cutting', subtitle: 'Lose fat, lean down', range: '1,700–2,500 cal/day', scale: 0.75, mealRange: '400–600 cal', snackRange: '100–300 cal', drinkRange: '100–300 cal', icon: TrendingDown, defaultGoals: { cal: 2000, p: 180, c: 180, f: 60 } },
};

// Unsplash photos — direct CDN URLs, food photography category, w=600 for performance
const IMG = {
  oats: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=80',
  yog: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  eggs: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
  toast: 'https://images.unsplash.com/photo-1603046891744-76e6300f82ef?w=600&q=80',
  smooth: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&q=80',
  pancake: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
  burrito: 'https://images.unsplash.com/photo-1584473457409-ce95a9c00c9a?w=600&q=80',
  acai: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80',
  granola: 'https://images.unsplash.com/photo-1502747644770-9d484958e76b?w=600&q=80',
  shaksh: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600&q=80',
  chicrice: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
  tuna: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  beef: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80',
  hallo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
  caesar: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80',
  poke: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=600&q=80',
  steaksal: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  pasta: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80',
  buddha: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
  spag: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80',
  stirfry: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
  lamb: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  curry: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
  steak: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  chicparm: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80',
  fishtaco: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  meatball: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80',
  protbar: 'https://images.unsplash.com/photo-1622484212385-1d4d2bba98f3?w=600&q=80',
  cottage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  beggs: 'https://images.unsplash.com/photo-1607690424560-ad06f4ce5be5?w=600&q=80',
  yogh: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80',
  trail: 'https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=600&q=80',
  hummus: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&q=80',
  ricecake: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=600&q=80',
  banpb: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80',
  jerky: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=600&q=80',
  edam: 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=600&q=80',
  coffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
  massg: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&q=80',
  green: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80',
  casein: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&q=80',
  soda: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80',
  matcha: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
  hotchoc: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80',
  electro: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  cocon: 'https://images.unsplash.com/photo-1612257999691-c8c0e7a40c73?w=600&q=80',
  kombu: 'https://images.unsplash.com/photo-1633933037018-ae42f9bd0b3f?w=600&q=80',
};

const MEALS = [
  // BREAKFAST (10)
  { id: 'b1', name: 'Protein Oats with Banana & Berries', cat: 'breakfast', img: IMG.oats, cal: 420, p: 32, c: 58, f: 8, tags: ['vego', 'gf'], scale: true, ing: [['Uncle Tobys Quick Oats', 60, 'g'], ['Optimum Nutrition Whey (vanilla)', 30, 'g'], ['Cavendish Banana', 1, 'medium'], ['Coles Frozen Mixed Berries', 80, 'g'], ['Pura Light Milk', 200, 'ml']], steps: ['Combine oats with milk in a microwave-safe bowl.', 'Microwave on high for 2 min, stir, then 1 more min.', 'Stir through whey once slightly cooled (so it doesn\'t clump).', 'Top with sliced banana and berries. Serve immediately.'] },
  { id: 'b2', name: 'Greek Yoghurt Power Bowl', cat: 'breakfast', img: IMG.yog, cal: 380, p: 28, c: 42, f: 10, tags: ['vego', 'gf'], scale: true, ing: [['Chobani Plain Greek Yoghurt 0%', 200, 'g'], ['Carman\'s Original Muesli', 40, 'g'], ['Coles Honey', 20, 'g'], ['Fresh strawberries', 100, 'g']], steps: ['Spoon yoghurt into a bowl.', 'Top with muesli.', 'Drizzle honey over the top.', 'Add sliced strawberries and serve.'] },
  { id: 'b3', name: 'Scrambled Eggs on Sourdough', cat: 'breakfast', img: IMG.eggs, cal: 480, p: 30, c: 38, f: 22, tags: ['vego'], scale: true, ing: [['Coles Free Range Eggs', 3, 'large'], ['Bakers Delight Sourdough', 2, 'slices'], ['Western Star Salted Butter', 10, 'g'], ['Pura Light Milk', 30, 'ml']], steps: ['Whisk eggs with milk, salt and pepper.', 'Melt butter in a non-stick pan over medium-low heat.', 'Pour in eggs, stir gently, removing while still slightly wet.', 'Toast sourdough. Plate eggs over toast.'] },
  { id: 'b4', name: 'Vegemite & Avocado Toast', cat: 'breakfast', img: IMG.toast, cal: 340, p: 12, c: 36, f: 16, tags: ['vego', 'df'], scale: true, ing: [['Helga\'s Wholemeal Bread', 2, 'slices'], ['Vegemite', 5, 'g'], ['Avocado', 100, 'g']], steps: ['Toast slices of Helga\'s wholemeal bread.', 'Spread a thin layer of Vegemite on each slice.', 'Mash avocado with a squeeze of lemon and pepper.', 'Spread avocado over the Vegemite. Serve.'] },
  { id: 'b5', name: 'Banana Protein Smoothie', cat: 'breakfast', img: IMG.smooth, cal: 320, p: 35, c: 38, f: 4, tags: ['vego', 'gf'], scale: true, ing: [['Optimum Nutrition Whey (chocolate)', 30, 'g'], ['Cavendish Banana', 1, 'medium'], ['Pura Skim Milk', 300, 'ml'], ['Coles Almond Spread', 5, 'g']], steps: ['Add all ingredients to a blender with 1 cup of ice.', 'Blend on high for 30 seconds until smooth.', 'Pour into a glass and serve immediately.'] },
  { id: 'b6', name: 'Protein Pancakes with Maple', cat: 'breakfast', img: IMG.pancake, cal: 460, p: 38, c: 52, f: 10, tags: ['vego'], scale: true, ing: [['Coles Self-Raising Flour', 50, 'g'], ['Optimum Nutrition Whey (vanilla)', 30, 'g'], ['Coles Free Range Eggs', 2, 'large'], ['Pura Skim Milk', 100, 'ml'], ['Maple Joe Pure Maple Syrup', 20, 'g'], ['Fresh blueberries', 60, 'g']], steps: ['Whisk flour, whey, eggs and milk into a smooth batter.', 'Heat a non-stick pan over medium. Pour 1/4-cup portions, cook 2 min until bubbles form.', 'Flip, cook another minute until golden.', 'Stack, drizzle with maple syrup, top with blueberries.'] },
  { id: 'b7', name: 'Breakfast Burrito', cat: 'breakfast', img: IMG.burrito, cal: 540, p: 36, c: 48, f: 22, tags: [], scale: true, ing: [['Mission Wholegrain Wrap', 1, 'large'], ['Coles Free Range Eggs', 3, 'large'], ['Coles Bacon', 30, 'g'], ['Bega Tasty Cheese', 25, 'g'], ['Coles Baby Spinach', 30, 'g'], ['Salsa', 20, 'g']], steps: ['Cook bacon in a pan until crisp, set aside.', 'Whisk eggs and scramble in the same pan over medium heat.', 'Lay wrap flat. Layer eggs, bacon, cheese, spinach and salsa down the centre.', 'Fold sides in, roll tightly. Slice in half on the diagonal.'] },
  { id: 'b8', name: 'Acai Power Bowl', cat: 'breakfast', img: IMG.acai, cal: 400, p: 22, c: 56, f: 10, tags: ['vego', 'gf', 'df'], scale: true, ing: [['Amazonia Acai Pack', 100, 'g'], ['Cavendish Banana', 1, 'medium'], ['Coles Frozen Mixed Berries', 80, 'g'], ['Optimum Nutrition Plant Protein', 25, 'g'], ['Coles Coconut Yoghurt', 60, 'g'], ['Coles Granola', 20, 'g']], steps: ['Blend acai pack, half the banana, frozen berries and protein with a splash of water until thick.', 'Pour into a bowl.', 'Top with sliced banana, granola and a dollop of coconut yoghurt.', 'Serve immediately while still cold.'] },
  { id: 'b9', name: 'Granola, Yoghurt & Honey Jar', cat: 'breakfast', img: IMG.granola, cal: 440, p: 24, c: 58, f: 12, tags: ['vego'], scale: true, ing: [['Carman\'s Classic Fruit Free Muesli', 50, 'g'], ['Chobani Vanilla Greek Yoghurt', 170, 'g'], ['Coles Honey', 15, 'g'], ['Fresh raspberries', 60, 'g']], steps: ['In a jar or glass, layer half the yoghurt at the bottom.', 'Sprinkle half the granola, then a drizzle of honey.', 'Repeat layers. Top with fresh raspberries.', 'Eat straight away or refrigerate up to 4 hours.'] },
  { id: 'b10', name: 'Shakshuka with Feta', cat: 'breakfast', img: IMG.shaksh, cal: 420, p: 26, c: 32, f: 22, tags: ['vego', 'gf'], scale: true, ing: [['Leggo\'s Tomato Pasta Sauce', 200, 'g'], ['Coles Free Range Eggs', 3, 'large'], ['Lemnos Feta', 40, 'g'], ['Coles Baby Spinach', 50, 'g'], ['Brown onion', 1, 'small'], ['Olive oil', 10, 'ml']], steps: ['Heat oil in a pan, sauté diced onion 4 min until soft.', 'Pour in tomato sauce, simmer 3 min. Stir through spinach.', 'Make 3 wells, crack an egg into each. Cover, cook 5-6 min until whites set.', 'Crumble feta over the top, season with pepper. Serve in the pan.'] },

  // LUNCH (10)
  { id: 'l1', name: 'Chicken & Rice Power Bowl', cat: 'lunch', img: IMG.chicrice, cal: 580, p: 52, c: 68, f: 10, tags: ['gf', 'df'], scale: true, ing: [['Lilydale Chicken Breast', 180, 'g'], ['SunRice Jasmine Rice (cooked)', 200, 'g'], ['Coles Broccoli', 100, 'g'], ['Coles Baby Spinach', 50, 'g'], ['Praise Light Mayo', 15, 'g']], steps: ['Season chicken with salt, pepper, paprika.', 'Heat 1 tsp olive oil in a pan over medium-high. Cook chicken 5-6 min each side until 75°C internal. Rest 5 min, slice.', 'Steam broccoli for 4 min.', 'Assemble: rice base, spinach, broccoli, sliced chicken. Drizzle with mayo.'] },
  { id: 'l2', name: 'Tuna Wrap with Salad', cat: 'lunch', img: IMG.tuna, cal: 420, p: 38, c: 42, f: 10, tags: ['df'], scale: true, ing: [['Mission Wholegrain Wrap', 1, 'large'], ['Sirena Tuna in Springwater', 95, 'g'], ['Coles Cos Lettuce', 50, 'g'], ['Coles Cherry Tomatoes', 80, 'g'], ['Praise Light Mayo', 15, 'g']], steps: ['Drain tuna and mix with mayo and a squeeze of lemon.', 'Lay wrap flat, add lettuce down the centre.', 'Top with tuna mix and halved cherry tomatoes.', 'Roll tightly, slice in half on the diagonal.'] },
  { id: 'l3', name: 'Lean Beef San Choy Bow', cat: 'lunch', img: IMG.beef, cal: 460, p: 42, c: 28, f: 18, tags: ['gf', 'df'], scale: true, ing: [['Coles 5-Star Lean Beef Mince', 150, 'g'], ['Iceberg Lettuce', 4, 'leaves'], ['Coles Hokkien Noodles', 80, 'g'], ['Masterfoods Soy Sauce', 15, 'ml']], steps: ['Heat sesame oil in a wok. Add minced garlic and ginger, fry 30 sec.', 'Add beef mince, break up and cook 5-6 min until browned.', 'Add cooked noodles and soy sauce, toss through.', 'Spoon into lettuce cups, top with sliced spring onion.'] },
  { id: 'l4', name: 'Halloumi & Quinoa Salad', cat: 'lunch', img: IMG.hallo, cal: 510, p: 28, c: 48, f: 22, tags: ['vego', 'gf'], scale: true, ing: [['Lemnos Halloumi', 100, 'g'], ['Coles Quinoa (cooked)', 150, 'g'], ['Mixed Salad Leaves', 60, 'g'], ['Cherry tomatoes', 100, 'g'], ['Cucumber', 80, 'g'], ['Olive oil', 15, 'ml']], steps: ['Slice halloumi into 1cm pieces.', 'Heat a dry pan over medium-high. Cook halloumi 1-2 min each side until golden.', 'Combine quinoa, leaves, tomatoes and cucumber in a bowl.', 'Top with halloumi, dress with olive oil and lemon juice.'] },
  { id: 'l5', name: 'Chicken Caesar Wrap', cat: 'lunch', img: IMG.caesar, cal: 540, p: 44, c: 46, f: 18, tags: [], scale: true, ing: [['Mission Wholegrain Wrap', 1, 'large'], ['Lilydale Chicken Breast (cooked)', 150, 'g'], ['Cos Lettuce', 60, 'g'], ['Coles Bacon (cooked)', 30, 'g'], ['Praise Caesar Dressing', 20, 'g'], ['Parmesan', 10, 'g']], steps: ['Cook bacon until crisp, drain on paper towel and chop.', 'Cook chicken (grill or pan), slice once rested.', 'Layer wrap with lettuce, chicken, bacon and parmesan.', 'Drizzle Caesar dressing, roll tightly.'] },
  { id: 'l6', name: 'Salmon Poke Bowl', cat: 'lunch', img: IMG.poke, cal: 560, p: 38, c: 64, f: 16, tags: ['df'], scale: true, ing: [['Tassal Salmon (sashimi-grade)', 150, 'g'], ['SunRice Sushi Rice (cooked)', 180, 'g'], ['Edamame (shelled)', 60, 'g'], ['Avocado', 80, 'g'], ['Cucumber', 60, 'g'], ['Kikkoman Soy Sauce', 15, 'ml'], ['Coles Sesame Seeds', 5, 'g']], steps: ['Dice salmon into 1.5cm cubes, marinate in soy sauce 5 min.', 'Spoon rice into a bowl as the base.', 'Arrange salmon, edamame, sliced avocado and cucumber on top.', 'Sprinkle sesame seeds, drizzle remaining soy. Serve.'] },
  { id: 'l7', name: 'Steak Salad with Balsamic', cat: 'lunch', img: IMG.steaksal, cal: 520, p: 46, c: 24, f: 28, tags: ['gf', 'df'], scale: true, ing: [['Coles Beef Sirloin', 180, 'g'], ['Coles Mixed Salad Leaves', 80, 'g'], ['Cherry tomatoes', 100, 'g'], ['Red onion', 30, 'g'], ['Pine nuts', 15, 'g'], ['Praise Balsamic Glaze', 15, 'ml'], ['Olive oil', 10, 'ml']], steps: ['Bring steak to room temp, season with salt and pepper.', 'Heat oil in a pan over high. Cook steak 3 min each side for medium-rare. Rest 5 min, slice.', 'Toss leaves, tomatoes, sliced red onion in a bowl.', 'Top with sliced steak, scatter pine nuts, drizzle balsamic glaze.'] },
  { id: 'l8', name: 'Turkey & Avo Burger', cat: 'lunch', img: IMG.burger, cal: 590, p: 44, c: 48, f: 22, tags: [], scale: true, ing: [['Coles Turkey Mince', 150, 'g'], ['Coles Brioche Bun', 1, 'piece'], ['Avocado', 60, 'g'], ['Cos Lettuce', 30, 'g'], ['Tomato', 50, 'g'], ['Praise Light Mayo', 10, 'g'], ['Bega Tasty Cheese', 20, 'g']], steps: ['Form turkey mince into a patty, season with salt, pepper and garlic powder.', 'Cook in a hot pan 4 min each side until 75°C internal. Rest 2 min.', 'Toast brioche bun cut-side down for 1 min.', 'Build: bun base, mayo, lettuce, patty, cheese, tomato, mashed avocado, top bun.'] },
  { id: 'l9', name: 'Pesto Chicken Pasta Salad', cat: 'lunch', img: IMG.pasta, cal: 560, p: 42, c: 58, f: 16, tags: [], scale: true, ing: [['San Remo Penne (cooked)', 150, 'g'], ['Lilydale Chicken Breast (cooked)', 150, 'g'], ['Sacla Basil Pesto', 25, 'g'], ['Cherry tomatoes', 100, 'g'], ['Coles Baby Spinach', 40, 'g'], ['Parmesan', 10, 'g']], steps: ['Cook pasta per packet, drain and rinse under cold water.', 'Slice cooked chicken into bite-sized pieces.', 'Toss pasta with pesto until well coated.', 'Add chicken, halved tomatoes, spinach. Top with shaved parmesan.'] },
  { id: 'l10', name: 'Vegan Buddha Bowl', cat: 'lunch', img: IMG.buddha, cal: 480, p: 22, c: 62, f: 16, tags: ['vego', 'df', 'gf'], scale: true, ing: [['Coles Quinoa (cooked)', 150, 'g'], ['Edgell Chickpeas (drained)', 100, 'g'], ['Sweet potato (roasted)', 150, 'g'], ['Coles Baby Spinach', 50, 'g'], ['Avocado', 60, 'g'], ['Black Swan Hummus', 30, 'g'], ['Pepitas', 10, 'g']], steps: ['Roast cubed sweet potato at 200°C for 25 min until tender.', 'Pan-roast chickpeas with paprika and salt for 4 min until crispy.', 'Assemble: quinoa base, then sections of spinach, sweet potato, chickpeas, avocado.', 'Add a dollop of hummus, scatter pepitas, drizzle olive oil.'] },

  // DINNER (10)
  { id: 'd1', name: 'Salmon, Sweet Potato & Greens', cat: 'dinner', img: IMG.salmon, cal: 620, p: 44, c: 52, f: 24, tags: ['gf', 'df'], scale: true, ing: [['Tassal Salmon Fillet', 180, 'g'], ['Sweet potato', 250, 'g'], ['Coles Green Beans', 100, 'g'], ['Olive oil', 15, 'ml']], steps: ['Preheat oven to 200°C. Cube sweet potato, toss with half the oil, roast 25 min.', 'Pat salmon dry, season with salt and pepper.', 'Heat remaining oil in a pan, skin-side down, cook 4 min. Flip, cook 2-3 min.', 'Steam green beans 3 min. Plate with salmon, sweet potato, lemon wedge.'] },
  { id: 'd2', name: 'Spaghetti Bolognese', cat: 'dinner', img: IMG.spag, cal: 580, p: 38, c: 72, f: 14, tags: ['df'], scale: true, ing: [['San Remo Spaghetti (dry)', 80, 'g'], ['Coles 5-Star Lean Mince', 130, 'g'], ['Leggo\'s Bolognese Sauce', 150, 'g'], ['Brown onion', 1, 'small'], ['Garlic', 2, 'cloves']], steps: ['Boil spaghetti per packet directions.', 'Sauté diced onion and garlic in olive oil for 3 min.', 'Add mince, brown for 5-6 min.', 'Stir through Leggo\'s sauce, simmer 5 min. Toss with drained pasta.'] },
  { id: 'd3', name: 'Teriyaki Chicken & Veg Stir-Fry', cat: 'dinner', img: IMG.stirfry, cal: 540, p: 48, c: 58, f: 10, tags: ['df'], scale: true, ing: [['Lilydale Chicken Thigh', 180, 'g'], ['SunRice Brown Rice (cooked)', 180, 'g'], ['Coles Stir-Fry Veg Mix', 200, 'g'], ['Kikkoman Teriyaki Marinade', 30, 'ml']], steps: ['Slice chicken thigh into strips, marinate in half the teriyaki for 10 min.', 'Heat sesame oil in a wok over high heat. Stir-fry chicken 5 min.', 'Add stir-fry veg, toss 3-4 min until tender-crisp.', 'Pour remaining teriyaki, toss to coat. Serve over rice.'] },
  { id: 'd4', name: 'Lamb Souvlaki Plate', cat: 'dinner', img: IMG.lamb, cal: 640, p: 46, c: 54, f: 26, tags: [], scale: true, ing: [['Coles Lamb Backstrap', 180, 'g'], ['Lebanese Pita Bread', 1, 'piece'], ['Black & Gold Greek Yoghurt', 60, 'g'], ['Cucumber', 80, 'g'], ['Cherry tomatoes', 100, 'g']], steps: ['Marinate diced lamb in olive oil, lemon, garlic, oregano for 15 min.', 'Thread onto skewers. Grill or pan-fry 3-4 min each side.', 'Make tzatziki: grate cucumber, squeeze water, mix with yoghurt and garlic.', 'Warm pita. Plate with lamb, tzatziki, tomato, red onion.'] },
  { id: 'd5', name: 'Vegetarian Chickpea Curry', cat: 'dinner', img: IMG.curry, cal: 480, p: 18, c: 68, f: 14, tags: ['vego', 'df', 'gf'], scale: true, ing: [['Edgell Chickpeas (drained)', 1, 'can'], ['Ayam Coconut Milk Light', 200, 'ml'], ['Pataks Tikka Masala Paste', 30, 'g'], ['SunRice Basmati (cooked)', 150, 'g'], ['Coles Baby Spinach', 60, 'g']], steps: ['Sauté diced onion in a pan for 3 min.', 'Add curry paste, fry 1 minute until fragrant.', 'Add chickpeas and coconut milk, simmer 10 min.', 'Stir through spinach until wilted. Serve over rice.'] },
  { id: 'd6', name: 'Pepper Steak with Mash', cat: 'dinner', img: IMG.steak, cal: 660, p: 50, c: 48, f: 26, tags: ['gf'], scale: true, ing: [['Coles Beef Eye Fillet', 180, 'g'], ['Potato', 300, 'g'], ['Western Star Salted Butter', 20, 'g'], ['Pura Light Milk', 50, 'ml'], ['Coles Green Beans', 100, 'g'], ['Cracked black pepper', 5, 'g']], steps: ['Boil peeled, chopped potato 15 min until tender. Drain, mash with butter and milk.', 'Press cracked pepper firmly into both sides of the steak. Salt generously.', 'Heat a pan over high. Cook steak 3-4 min each side. Rest 5 min.', 'Steam beans 3 min. Plate steak on mash with beans alongside.'] },
  { id: 'd7', name: 'Chicken Parmigiana', cat: 'dinner', img: IMG.chicparm, cal: 690, p: 56, c: 58, f: 22, tags: [], scale: true, ing: [['Lilydale Chicken Breast', 180, 'g'], ['Coles Panko Breadcrumbs', 30, 'g'], ['Coles Free Range Eggs', 1, 'large'], ['Leggo\'s Tomato Sauce', 80, 'g'], ['Bega Tasty Cheese', 40, 'g'], ['Coles Steakhouse Chips', 150, 'g'], ['Coles Mixed Salad', 60, 'g']], steps: ['Preheat oven to 200°C. Bake chips 20 min.', 'Pound chicken to even thickness. Dip in beaten egg, coat in breadcrumbs.', 'Pan-fry chicken in oil 3 min each side until golden. Transfer to a baking tray.', 'Top with tomato sauce and cheese. Bake 8 min until cheese is bubbling. Serve with chips and salad.'] },
  { id: 'd8', name: 'Baja Fish Tacos', cat: 'dinner', img: IMG.fishtaco, cal: 520, p: 36, c: 58, f: 14, tags: ['df'], scale: true, ing: [['Coles Barramundi Fillet', 180, 'g'], ['Mission Mini Wraps', 3, 'pieces'], ['Red cabbage (shredded)', 80, 'g'], ['Avocado', 60, 'g'], ['Lime', 1, 'medium'], ['Coles Mexican Spice Mix', 5, 'g'], ['Coriander', 10, 'g']], steps: ['Pat fish dry, season with Mexican spice mix and a pinch of salt.', 'Pan-fry fish in 1 tsp oil for 3 min each side until just cooked. Flake into chunks.', 'Warm mini wraps in a dry pan 30 sec each side.', 'Build tacos: cabbage, fish, sliced avocado, fresh coriander, big squeeze of lime.'] },
  { id: 'd9', name: 'High-Protein Pizza', cat: 'dinner', img: IMG.pizza, cal: 620, p: 42, c: 58, f: 22, tags: ['vego'], scale: true, ing: [['Lebanese Flatbread', 1, 'piece'], ['Leggo\'s Pizza Sauce', 50, 'g'], ['Bega Tasty Cheese', 50, 'g'], ['Coles Bocconcini', 60, 'g'], ['Cherry tomatoes', 80, 'g'], ['Fresh basil', 5, 'g'], ['Olive oil', 5, 'ml']], steps: ['Preheat oven to 220°C.', 'Spread sauce over flatbread. Scatter tasty cheese, then bocconcini and halved tomatoes.', 'Bake 8-10 min until cheese is melted and edges golden.', 'Top with fresh basil, drizzle olive oil, slice and serve.'] },
  { id: 'd10', name: 'Turkey Meatballs in Sauce', cat: 'dinner', img: IMG.meatball, cal: 540, p: 48, c: 52, f: 16, tags: ['df'], scale: true, ing: [['Coles Turkey Mince', 180, 'g'], ['Coles Panko Breadcrumbs', 20, 'g'], ['Coles Free Range Eggs', 1, 'large'], ['Leggo\'s Tomato Sauce', 200, 'g'], ['San Remo Spaghetti (dry)', 70, 'g'], ['Garlic', 2, 'cloves'], ['Italian herbs', 3, 'g']], steps: ['Mix turkey, breadcrumbs, egg and herbs. Roll into 8-10 meatballs.', 'Brown meatballs in 1 tsp oil for 5 min, turning to colour all sides.', 'Add garlic and tomato sauce, simmer 12 min until meatballs are cooked through.', 'Cook spaghetti per packet. Plate pasta, top with meatballs and sauce.'] },

  // SNACKS (10)
  { id: 's1', name: 'Protein Bar & Apple', cat: 'snacks', img: IMG.protbar, cal: 280, p: 22, c: 38, f: 6, tags: ['vego', 'bulk', 'maintain'], scale: false, ing: [['Quest Protein Bar', 60, 'g'], ['Pink Lady Apple', 1, 'medium']], steps: ['Grab a Quest bar from the pantry.', 'Wash and slice the apple if preferred.', 'Eat together for sustained energy.'] },
  { id: 's2', name: 'Cottage Cheese & Rice Cakes', cat: 'snacks', img: IMG.cottage, cal: 220, p: 20, c: 26, f: 4, tags: ['vego', 'gf', 'maintain', 'cut'], scale: false, ing: [['Black Swan Cottage Cheese', 150, 'g'], ['SunRice Plain Rice Cakes', 3, 'pieces']], steps: ['Top each rice cake with 50g cottage cheese.', 'Season with cracked pepper and snipped chives.', 'Eat immediately so cakes stay crisp.'] },
  { id: 's3', name: 'Boiled Eggs & Carrot Sticks', cat: 'snacks', img: IMG.beggs, cal: 200, p: 14, c: 10, f: 11, tags: ['vego', 'gf', 'df', 'cut', 'maintain'], scale: false, ing: [['Coles Free Range Eggs', 2, 'large'], ['Coles Carrots', 150, 'g']], steps: ['Boil eggs for 8-9 min. Cool in iced water and peel.', 'Cut carrots into sticks.', 'Sprinkle eggs with salt, serve with carrots.'] },
  { id: 's4', name: 'Greek Yoghurt with Honey', cat: 'snacks', img: IMG.yogh, cal: 180, p: 18, c: 22, f: 1, tags: ['vego', 'gf', 'cut', 'maintain'], scale: false, ing: [['Chobani Plain Greek Yoghurt 0%', 170, 'g'], ['Coles Honey', 7, 'g']], steps: ['Spoon yoghurt into a bowl.', 'Drizzle with honey.', 'Stir or eat as-is.'] },
  { id: 's5', name: 'Trail Mix Energy Bowl', cat: 'snacks', img: IMG.trail, cal: 450, p: 14, c: 38, f: 28, tags: ['vego', 'gf', 'bulk'], scale: false, ing: [['Coles Mixed Nuts', 50, 'g'], ['Sun-Maid Raisins', 30, 'g'], ['Whittaker\'s Dark Chocolate', 20, 'g'], ['Pepitas', 20, 'g']], steps: ['Combine all ingredients in a small bowl or container.', 'Pre-portion into snap-lock bags for grab-and-go.', 'Eat as a high-calorie snack between meals.'] },
  { id: 's6', name: 'Hummus & Veg Sticks', cat: 'snacks', img: IMG.hummus, cal: 240, p: 8, c: 24, f: 13, tags: ['vego', 'df', 'cut', 'maintain'], scale: false, ing: [['Black Swan Classic Hummus', 60, 'g'], ['Cucumber', 100, 'g'], ['Capsicum', 100, 'g'], ['Coles Carrots', 80, 'g']], steps: ['Cut all vegetables into long sticks.', 'Spoon hummus into a small dish.', 'Dip and enjoy.'] },
  { id: 's7', name: 'Rice Cakes with Almond Butter', cat: 'snacks', img: IMG.ricecake, cal: 320, p: 10, c: 36, f: 16, tags: ['vego', 'gf', 'df', 'maintain', 'bulk'], scale: false, ing: [['SunRice Plain Rice Cakes', 3, 'pieces'], ['Mayver\'s Smooth Almond Butter', 30, 'g'], ['Cavendish Banana', 1, 'small']], steps: ['Spread almond butter evenly across each rice cake.', 'Top with thinly sliced banana.', 'Eat straight away for the best crunch.'] },
  { id: 's8', name: 'Banana with Peanut Butter', cat: 'snacks', img: IMG.banpb, cal: 290, p: 8, c: 32, f: 16, tags: ['vego', 'gf', 'df', 'bulk', 'maintain'], scale: false, ing: [['Cavendish Banana', 1, 'large'], ['Coles Smooth Peanut Butter', 25, 'g']], steps: ['Slice banana lengthways down the middle.', 'Spread peanut butter into the cut.', 'Eat as-is or sandwich back together.'] },
  { id: 's9', name: 'Beef Jerky & Cheese', cat: 'snacks', img: IMG.jerky, cal: 260, p: 28, c: 6, f: 14, tags: ['gf', 'cut', 'maintain'], scale: false, ing: [['Jack Link\'s Beef Jerky', 40, 'g'], ['Bega Stringers Cheese', 30, 'g']], steps: ['Open jerky pack.', 'Pair with cheese stick.', 'Great high-protein, low-carb on-the-go option.'] },
  { id: 's10', name: 'Edamame with Sea Salt', cat: 'snacks', img: IMG.edam, cal: 180, p: 16, c: 14, f: 8, tags: ['vego', 'gf', 'df', 'cut', 'maintain'], scale: false, ing: [['Coles Frozen Edamame (in pods)', 150, 'g'], ['Sea salt', 2, 'g']], steps: ['Boil edamame pods in salted water for 4 min.', 'Drain well.', 'Sprinkle with sea salt. Squeeze beans from pods to eat.'] },

  // DRINKS (10)
  { id: 'dr1', name: 'Iced Protein Coffee', cat: 'drinks', img: IMG.coffee, cal: 140, p: 26, c: 6, f: 2, tags: ['vego', 'gf', 'cut', 'maintain'], scale: false, ing: [['Optimum Nutrition Whey (vanilla)', 25, 'g'], ['Vittoria Espresso', 30, 'ml'], ['Pura Skim Milk', 200, 'ml']], steps: ['Pull a fresh espresso shot, let cool slightly.', 'Add milk, espresso and protein powder to a shaker.', 'Shake hard for 15 seconds. Pour over ice.'] },
  { id: 'dr2', name: 'Mass Gainer Smoothie', cat: 'drinks', img: IMG.massg, cal: 720, p: 48, c: 88, f: 18, tags: ['vego', 'gf', 'bulk'], scale: false, ing: [['Optimum Nutrition Whey', 50, 'g'], ['Coles Rolled Oats', 60, 'g'], ['Cavendish Banana', 1, 'large'], ['Coles Peanut Butter', 30, 'g'], ['Pura Full Cream Milk', 400, 'ml'], ['Coles Honey', 15, 'g']], steps: ['Add all ingredients to a high-powered blender.', 'Blend on high for 60 seconds until completely smooth.', 'Drink within 15 min for best texture.'] },
  { id: 'dr3', name: 'Green Detox Juice', cat: 'drinks', img: IMG.green, cal: 110, p: 3, c: 24, f: 1, tags: ['vego', 'gf', 'df', 'cut', 'maintain'], scale: false, ing: [['Coles Baby Spinach', 50, 'g'], ['Granny Smith Apple', 1, 'medium'], ['Lebanese Cucumber', 1, 'medium'], ['Lemon', 1, 'small'], ['Fresh ginger', 5, 'g']], steps: ['Wash all produce.', 'Juice apple, cucumber, spinach, lemon and ginger.', 'Stir well, serve over ice immediately.'] },
  { id: 'dr4', name: 'Chocolate Casein Night Shake', cat: 'drinks', img: IMG.casein, cal: 220, p: 32, c: 14, f: 4, tags: ['vego', 'gf', 'cut', 'maintain', 'bulk'], scale: false, ing: [['Optimum Nutrition Casein (chocolate)', 30, 'g'], ['Pura Skim Milk', 250, 'ml']], steps: ['Add milk and casein to a shaker.', 'Shake for 20 seconds.', 'Pour over ice, drink 30-45 min before bed.'] },
  { id: 'dr5', name: 'Sparkling Lime & Mint Water', cat: 'drinks', img: IMG.soda, cal: 5, p: 0, c: 1, f: 0, tags: ['vego', 'gf', 'df', 'cut', 'maintain', 'bulk'], scale: false, ing: [['Schweppes Soda Water', 400, 'ml'], ['Fresh lime', 1, 'small'], ['Fresh mint', 4, 'leaves']], steps: ['Fill glass with ice.', 'Squeeze lime, add mint leaves and muddle gently.', 'Top with soda water, stir.'] },
  { id: 'dr6', name: 'Iced Matcha Protein Latte', cat: 'drinks', img: IMG.matcha, cal: 180, p: 26, c: 10, f: 4, tags: ['vego', 'gf', 'cut', 'maintain'], scale: false, ing: [['Coles Ceremonial Matcha Powder', 3, 'g'], ['Optimum Nutrition Whey (vanilla)', 25, 'g'], ['Vitasoy Almond Milk', 250, 'ml']], steps: ['Whisk matcha with 30ml hot water until smooth and lump-free.', 'Add to a shaker with milk and whey, shake for 15 sec.', 'Pour over ice, stir and serve.'] },
  { id: 'dr7', name: 'Hot Protein Hot Chocolate', cat: 'drinks', img: IMG.hotchoc, cal: 240, p: 28, c: 22, f: 5, tags: ['vego', 'gf', 'maintain', 'bulk'], scale: false, ing: [['Optimum Nutrition Whey (chocolate)', 30, 'g'], ['Cadbury Cocoa Powder', 5, 'g'], ['Pura Light Milk', 300, 'ml']], steps: ['Heat milk in a saucepan until just steaming (do not boil).', 'Whisk in cocoa powder until dissolved.', 'Cool slightly (under 60°C) then whisk in protein powder.', 'Pour into a mug. Serve warm.'] },
  { id: 'dr8', name: 'Electrolyte Lemon Refresher', cat: 'drinks', img: IMG.electro, cal: 25, p: 0, c: 6, f: 0, tags: ['vego', 'gf', 'df', 'cut', 'maintain', 'bulk'], scale: false, ing: [['Coles Pink Himalayan Salt', 1, 'g'], ['Lemon (juiced)', 1, 'medium'], ['Filtered water', 500, 'ml'], ['Coles Honey', 5, 'g']], steps: ['Combine lemon juice, salt and honey in a glass.', 'Top with filtered water, stir well.', 'Add ice. Drink during or after training.'] },
  { id: 'dr9', name: 'Coconut Recovery Shake', cat: 'drinks', img: IMG.cocon, cal: 320, p: 30, c: 38, f: 6, tags: ['vego', 'gf', 'maintain', 'bulk'], scale: false, ing: [['Optimum Nutrition Whey (vanilla)', 30, 'g'], ['Coco-Quench Coconut Water', 300, 'ml'], ['Cavendish Banana', 1, 'medium'], ['Pineapple chunks (frozen)', 80, 'g']], steps: ['Add all ingredients to a blender.', 'Blend on high for 30 sec until smooth.', 'Pour into a glass, drink within 30 min post-workout.'] },
  { id: 'dr10', name: 'Kombucha on Ice', cat: 'drinks', img: IMG.kombu, cal: 60, p: 0, c: 14, f: 0, tags: ['vego', 'gf', 'df', 'cut', 'maintain'], scale: false, ing: [['Remedy Kombucha (any flavour)', 330, 'ml']], steps: ['Pour kombucha over a glass of ice.', 'Garnish with a slice of lemon if desired.', 'Drink fresh from the bottle for best probiotics.'] },
];

const CATS = [{ id: 'breakfast', l: 'Breakfast', i: Coffee }, { id: 'lunch', l: 'Lunch', i: Sandwich }, { id: 'dinner', l: 'Dinner', i: UtensilsCrossed }, { id: 'snacks', l: 'Snacks', i: Apple }, { id: 'drinks', l: 'Drinks', i: GlassWater }];
const DIET = [{ id: 'vego', l: 'Vegetarian' }, { id: 'gf', l: 'Gluten Free' }, { id: 'df', l: 'Dairy Free' }];
const PW = 'CNA2026';
const G = '#C9A961', K = '#0A0A0A', BG = '#FAFAF7', LINE = '#E8E2D0';

// Round to nearest whole number for items where decimals don't make sense (eggs, slices, leaves, etc.)
const WHOLE_UNITS = ['large', 'medium', 'small', 'slices', 'leaves', 'pieces', 'cloves', 'can'];
const fmtAmt = (amt, unit) => {
  if (typeof amt !== 'number') return amt;
  if (WHOLE_UNITS.includes(unit)) return Math.max(1, Math.round(amt));
  // grams/ml: round to nearest 5
  if (['g', 'ml'].includes(unit)) return Math.round(amt / 5) * 5;
  return Math.round(amt);
};
const fmtUnit = (u) => ['g', 'ml', 'kg', 'l'].includes(u) ? u : ` ${u}`;

// CORZNAFFECT logo: gold serif CA with horizontal CORZNAFFECT band cutting through
// Plain gold CORZNAFFECT wordmark — no box, no frame, no monogram
const Logo = ({ size = 200 }) => {
  const fontSize = Math.max(12, Math.round(size * 0.11));
  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: `${fontSize}px`, letterSpacing: `${fontSize * 0.35}px`, color: G, fontWeight: 600, textTransform: 'uppercase', display: 'inline-block', paddingLeft: `${fontSize * 0.35}px` }}>CORZNAFFECT</div>
  );
};

// Compact wordmark for headers (smaller version of the same)
const LogoMark = ({ size = 60 }) => {
  const fontSize = Math.max(10, Math.round(size * 0.22));
  return (
    <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: `${fontSize}px`, letterSpacing: `${fontSize * 0.3}px`, color: G, fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', paddingLeft: `${fontSize * 0.3}px` }}>CORZNAFFECT</div>
  );
};

const SHARED_CSS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=DM+Sans:wght@400;500;600;700&display=swap'); * { box-sizing: border-box; } body { margin: 0; } input:focus,textarea:focus { outline: none; border-color: ${G} !important; } button:not(:disabled):hover { transform: translateY(-1px); } button { transition: all 0.2s ease; } .mc { transition: all 0.2s ease; } .mc:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(10,10,10,0.08); border-color: ${G} !important; } .mc img { transition: transform 0.4s ease; } .mc:hover img { transform: scale(1.05); } @media print { .np { display: none !important; } body { background: white !important; } }`;
const BF = { fontFamily: '"DM Sans", sans-serif' };
const SF = { fontFamily: '"Fraunces", Georgia, serif' };

const DISCLAIMER = "I am not a certified dietitian. All information shared is based solely on personal study and coaching practice. Please consult a qualified health professional for medical conditions or specific dietary requirements.";

export default function MealBuilder() { 
  const [unlocked, setUnlocked] = useState(false);
  const [pwIn, setPwIn] = useState('');
  const [codeIn, setCodeIn] = useState('');
  const [err, setErr] = useState(false);
  const [code, setCode] = useState(null);
  const [phase, setPhase] = useState(null);
  const [goalsSet, setGoalsSet] = useState(false);
  const [goals, setGoals] = useState({ cal: 2400, p: 170, c: 260, f: 80 });
  const [tg, setTg] = useState({ cal: '', p: '', c: '', f: '' });
  const [tab, setTab] = useState('breakfast');
  const [plan, setPlan] = useState([]);
  const [filters, setFilters] = useState([]);
  const [view, setView] = useState('builder');
  const [date, setDate] = useState(null);
  const [reviews, setReviews] = useState({});
  const [reviewing, setReviewing] = useState(null);

  useEffect(() => {
    if (code) {
      try {
        const s = JSON.parse(localStorage.getItem(`cz_${code}`) || '{}');
        if (s.phase) setPhase(s.phase);
        if (s.goals) { setGoals(s.goals); setGoalsSet(true); }
        if (s.plan) setPlan(s.plan);
        if (s.reviews) setReviews(s.reviews);
      } catch (e) {}
    }
  }, [code]);

  useEffect(() => {
    if (code) { try { localStorage.setItem(`cz_${code}`, JSON.stringify({ phase, goals: goalsSet ? goals : null, plan, reviews })); } catch (e) {} }
  }, [code, phase, goals, goalsSet, plan, reviews]);

  const scaled = useMemo(() => {
    if (!phase) return MEALS;
    const sc = PHASES[phase].scale;
    return MEALS.map(m => m.scale ? { ...m, cal: Math.round(m.cal * sc), p: Math.round(m.p * sc), c: Math.round(m.c * sc), f: Math.round(m.f * sc), ing: m.ing.map(([item, amt, unit]) => [item, typeof amt === 'number' ? fmtAmt(amt * sc, unit) : amt, unit]) } : m);
  }, [phase]);

  const phaseMeals = useMemo(() => phase ? scaled.filter(m => m.scale || m.tags.includes(phase)) : scaled, [scaled, phase]);

  const totals = useMemo(() => plan.reduce((a, p) => { const m = scaled.find(x => x.id === p.id); if (!m) return a; return { cal: a.cal + m.cal * p.qty, p: a.p + m.p * p.qty, c: a.c + m.c * p.qty, f: a.f + m.f * p.qty }; }, { cal: 0, p: 0, c: 0, f: 0 }), [plan, scaled]);

  const stat = (cur, goal, tol = 0.05) => { if (!goal) return 'n'; const d = (cur - goal) / goal; if (Math.abs(d) <= tol) return 'on'; return d > tol ? 'over' : 'under'; };
  const sCal = stat(totals.cal, goals.cal), sP = stat(totals.p, goals.p), sC = stat(totals.c, goals.c, 0.10), sF = stat(totals.f, goals.f, 0.10);
  const onTrack = sCal === 'on' && sP === 'on' && sC === 'on' && sF === 'on';

  const add = id => setPlan(p => { const e = p.find(x => x.id === id); return e ? p.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...p, { id, qty: 1 }]; });
  const sub = id => setPlan(p => { const e = p.find(x => x.id === id); if (!e) return p; return e.qty <= 1 ? p.filter(x => x.id !== id) : p.map(x => x.id === id ? { ...x, qty: x.qty - 1 } : x); });
  const rmAll = id => setPlan(p => p.filter(x => x.id !== id));
  const clr = () => { if (window.confirm('Clear all items?')) setPlan([]); };
  const tFil = id => setFilters(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const subGoals = () => { const g = { cal: +tg.cal, p: +tg.p, c: +tg.c, f: +tg.f }; if (g.cal && g.p && g.c && g.f) { setGoals(g); setGoalsSet(true); } };
  const useDef = () => { setGoals(PHASES[phase].defaultGoals); setGoalsSet(true); };
  const finalise = () => { setDate(new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })); setView('finalised'); };
  const subRev = (id, d) => { setReviews(r => ({ ...r, [id]: { ...d, date: new Date().toLocaleDateString('en-AU') } })); setReviewing(null); };

  const visible = useMemo(() => phaseMeals.filter(m => m.cat === tab).filter(m => filters.length === 0 || filters.every(f => m.tags.includes(f))), [tab, filters, phaseMeals]);
  const planMeals = plan.map(p => ({ ...scaled.find(m => m.id === p.id), qty: p.qty }));
  const shopping = useMemo(() => {
    const map = {};
    planMeals.forEach(m => m.ing.forEach(([item, amt, unit]) => {
      if (!map[item]) map[item] = { item, total: 0, unit };
      map[item].total += (typeof amt === 'number' ? amt : 1) * m.qty;
    }));
    return Object.values(map).map(i => ({ ...i, total: fmtAmt(i.total, i.unit) }));
  }, [planMeals]);

  const page = { minHeight: '100vh', background: BG, ...SF, color: K };
  const wrap = { maxWidth: 1200, margin: '0 auto', padding: '32px 20px' };

  // PASSWORD GATE
  if (!unlocked) return (
    <div style={{ ...page, background: K, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{SHARED_CSS}</style>
      <div style={{ background: BG, padding: '48px 44px', maxWidth: 460, width: '100%', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}><Logo size={220} /></div>
        <h1 style={{ fontSize: 26, fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.02em', textAlign: 'center', fontStyle: 'italic' }}>Customisable Meal Plan</h1>
        <p style={{ ...BF, fontSize: 13, color: '#5A5A5A', margin: '0 0 28px', lineHeight: 1.5, textAlign: 'center' }}>Enter the access password and your unique client code sent via WhatsApp.</p>
        <label style={{ ...BF, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: K, fontWeight: 600, display: 'block', marginBottom: 6 }}>Access Password</label>
        <input type="password" value={pwIn} onChange={e => { setPwIn(e.target.value); setErr(false); }} placeholder="••••••••" style={{ ...BF, width: '100%', padding: '13px 14px', fontSize: 14, border: `1px solid ${err ? '#A03020' : '#D4CFBF'}`, background: '#FFF', marginBottom: 16 }} />
        <label style={{ ...BF, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: K, fontWeight: 600, display: 'block', marginBottom: 6 }}>Client Code</label>
        <input type="text" value={codeIn} onChange={e => { setCodeIn(e.target.value.toUpperCase()); setErr(false); }} placeholder="e.g. JOHN-2026" style={{ ...BF, width: '100%', padding: '13px 14px', fontSize: 14, border: `1px solid ${err ? '#A03020' : '#D4CFBF'}`, background: '#FFF', marginBottom: 12, textTransform: 'uppercase' }} />
        {err && <div style={{ ...BF, fontSize: 12, color: '#A03020', marginBottom: 12 }}>Incorrect password. Check your WhatsApp message.</div>}
        <button onClick={() => { if (pwIn === PW && codeIn.length >= 3) { setUnlocked(true); setCode(codeIn); } else setErr(true); }} style={{ ...BF, width: '100%', padding: 14, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: K, color: G, border: 'none', cursor: 'pointer', marginTop: 8 }}>Unlock Access</button>
        <p style={{ ...BF, fontSize: 11, color: '#7A7A7A', marginTop: 20, textAlign: 'center', lineHeight: 1.5 }}>Your client code saves your progress.<br />Use the same code to return to your plan.</p>
      </div>
    </div>
  );

  // PHASE SELECT
  if (!phase) return (
    <div style={page}>
      <style>{SHARED_CSS}</style>
      <div style={{ ...wrap, padding: '48px 20px', maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}><Logo size={180} /></div>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>Step 1 of 2</div>
          <h1 style={{ fontSize: 44, fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.05, fontStyle: 'italic' }}>What's your goal?</h1>
          <p style={{ ...BF, fontSize: 15, color: '#5A5A5A', margin: 0, lineHeight: 1.6, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>Your phase determines portion sizes, meal options, and shopping list quantities. Pick what your coach has assigned.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {Object.values(PHASES).map(p => {
            const Ic = p.icon;
            return (
              <button key={p.id} onClick={() => setPhase(p.id)} style={{ ...BF, textAlign: 'left', padding: '32px 28px', background: '#FFF', border: '1px solid #D4CFBF', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }} className="pc">
                <div className="pa" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: G, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s ease' }} />
                <Ic size={32} color={G} strokeWidth={1.4} />
                <div>
                  <div style={{ ...SF, fontSize: 28, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 13, color: '#5A5A5A', lineHeight: 1.5, marginBottom: 12 }}>{p.subtitle}</div>
                  <div style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: G, fontWeight: 700 }}>{p.range}</div>
                </div>
                <div style={{ marginTop: 4, paddingTop: 14, borderTop: '1px solid #F0EBDC', fontSize: 11, color: '#7A7A7A', lineHeight: 1.7 }}>
                  <div>Meals: {p.mealRange}</div>
                  <div>Snacks: {p.snackRange}</div>
                  <div>Drinks: {p.drinkRange}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`.pc:hover .pa { transform: scaleX(1) !important; }`}</style>
    </div>
  );

  // GOAL SETUP
  if (!goalsSet) return (
    <div style={page}>
      <style>{SHARED_CSS}</style>
      <div style={{ ...wrap, padding: '48px 20px', maxWidth: 600 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}><Logo size={160} /></div>
        <div style={{ background: '#FFF', padding: '44px 40px', border: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
          <button onClick={() => setPhase(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#7A7A7A', padding: '4px 0', display: 'inline-flex', alignItems: 'center', gap: 4, ...BF, fontSize: 12, marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 12 }}>Step 2 of 2 · {PHASES[phase].label}</div>
          <h1 style={{ fontSize: 32, fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1, fontStyle: 'italic' }}>Your daily targets</h1>
          <p style={{ ...BF, fontSize: 14, color: '#5A5A5A', margin: '0 0 28px', lineHeight: 1.6 }}>Use the macros provided by your coach. Or use phase defaults to start.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[['cal', 'Calories', 'kcal'], ['p', 'Protein', 'grams'], ['c', 'Carbs', 'grams'], ['f', 'Fats', 'grams']].map(([k, l, u]) => (
              <div key={k}>
                <label style={{ ...BF, fontSize: 11, fontWeight: 600, color: K, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: 6 }}>{l}</label>
                <input type="number" value={tg[k]} onChange={e => setTg({ ...tg, [k]: e.target.value })} placeholder={u} style={{ ...BF, width: '100%', padding: '12px 14px', fontSize: 15, border: '1px solid #D4CFBF', background: BG }} />
              </div>
            ))}
          </div>
          <button onClick={subGoals} disabled={!tg.cal || !tg.p || !tg.c || !tg.f} style={{ ...BF, width: '100%', padding: 14, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: (!tg.cal || !tg.p || !tg.c || !tg.f) ? '#C0C0C0' : K, color: G, border: 'none', cursor: (!tg.cal || !tg.p || !tg.c || !tg.f) ? 'not-allowed' : 'pointer' }}>Continue to meal builder</button>
          <button onClick={useDef} style={{ ...BF, width: '100%', padding: 12, fontSize: 12, fontWeight: 500, background: 'transparent', color: '#7A7A7A', border: 'none', cursor: 'pointer', marginTop: 10, textDecoration: 'underline' }}>Or use {PHASES[phase].label} defaults ({PHASES[phase].defaultGoals.cal} cal · {PHASES[phase].defaultGoals.p}P / {PHASES[phase].defaultGoals.c}C / {PHASES[phase].defaultGoals.f}F)</button>
        </div>
      </div>
    </div>
  );

  // REVIEW MODAL
  if (reviewing) return <Review meal={scaled.find(m => m.id === reviewing)} existing={reviews[reviewing] || {}} onSubmit={d => subRev(reviewing, d)} onCancel={() => setReviewing(null)} />;

  // FINALISED
  if (view === 'finalised') return (
    <div style={page}>
      <style>{SHARED_CSS}</style>
      <div style={wrap}>
        <div className="np" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <button onClick={() => setView('builder')} style={{ ...BF, padding: '10px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', background: 'transparent', color: K, border: `1px solid ${K}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}><ArrowLeft size={14} /> Back to builder</button>
          <button onClick={() => window.print()} style={{ ...BF, padding: '10px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: G, color: K, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}><FileText size={14} /> Print / Save PDF</button>
        </div>
        <div style={{ background: '#FFF', padding: 48, border: `1px solid ${LINE}` }}>
          <div style={{ borderBottom: `1px solid ${LINE}`, paddingBottom: 24, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 8 }}>{PHASES[phase].label} · Custom Meal Plan</div>
              <h1 style={{ fontSize: 44, fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.05, fontStyle: 'italic' }}>Your Plan</h1>
              <div style={{ ...BF, fontSize: 13, color: '#5A5A5A' }}>{date} · Client {code}</div>
            </div>
            <Logo size={140} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 40 }}>
            {[['Calories', totals.cal, goals.cal, ''], ['Protein', totals.p, goals.p, 'g'], ['Carbs', totals.c, goals.c, 'g'], ['Fats', totals.f, goals.f, 'g']].map(([l, v, gg, u]) => (
              <div key={l} style={{ background: BG, padding: '18px 20px', borderLeft: `3px solid ${G}` }}>
                <div style={{ ...BF, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#7A7A7A', marginBottom: 6, fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: 26, fontWeight: 400, lineHeight: 1, fontStyle: 'italic' }}>{Math.round(v)}<span style={{ fontSize: 13, color: '#7A7A7A', marginLeft: 4, fontStyle: 'normal' }}>{u}</span></div>
                <div style={{ ...BF, fontSize: 11, color: '#5A5A5A', marginTop: 4 }}>Target: {gg}{u}</div>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 400, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10, fontStyle: 'italic' }}><ShoppingCart size={20} color={G} /> Shopping List</h2>
          <div style={{ background: BG, padding: '24px 28px', marginBottom: 12, border: `1px solid ${LINE}` }}>
            <ul style={{ ...BF, margin: 0, padding: 0, listStyle: 'none', columnCount: 2, columnGap: 32 }}>
              {shopping.map((it, i) => (
                <li key={i} style={{ fontSize: 13, padding: '8px 0', borderBottom: `1px solid ${LINE}`, breakInside: 'avoid' }}>
                  <span style={{ color: G, fontWeight: 700, marginRight: 10 }}>•</span>
                  <span style={{ fontWeight: 600 }}>{it.total}{fmtUnit(it.unit)}</span> {it.item}
                </li>
              ))}
            </ul>
          </div>
          <p style={{ ...BF, fontSize: 10, color: '#9A9A9A', fontStyle: 'italic', marginBottom: 40, lineHeight: 1.5 }}>{DISCLAIMER}</p>
          <h2 style={{ fontSize: 24, fontWeight: 400, margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 10, fontStyle: 'italic' }}><ChefHat size={20} color={G} /> Recipes &amp; Instructions</h2>
          {planMeals.map(m => (
            <div key={m.id} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: `1px solid ${LINE}`, breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: 22, fontWeight: 400, margin: 0, letterSpacing: '-0.01em', fontStyle: 'italic' }}>{m.name}{m.qty > 1 && <span style={{ ...BF, fontSize: 13, color: G, marginLeft: 12, fontStyle: 'normal', fontWeight: 700 }}>×{m.qty}</span>}</h3>
                <div style={{ ...BF, fontSize: 12, color: '#5A5A5A' }}>{m.cal} cal · {m.p}P · {m.c}C · {m.f}F per serve</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 28 }}>
                <div>
                  <div style={{ ...BF, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: G, marginBottom: 10, fontWeight: 700 }}>Ingredients</div>
                  <ul style={{ ...BF, margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.8, color: K }}>
                    {m.ing.map(([item, amt, unit], i) => <li key={i}><strong>{fmtAmt(amt, unit)}{fmtUnit(unit)}</strong> {item}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ ...BF, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: G, marginBottom: 10, fontWeight: 700 }}>Method</div>
                  <ol style={{ ...BF, margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.8, color: K }}>
                    {m.steps.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
                  </ol>
                </div>
              </div>
              <div className="np" style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {reviews[m.id] ? (
                  <div style={{ ...BF, fontSize: 12, color: G, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: BG, border: `1px solid ${G}`, borderRadius: 20 }}><Check size={13} /> Reviewed · {'★'.repeat(reviews[m.id].rating || 0)}</div>
                ) : (
                  <button onClick={() => setReviewing(m.id)} style={{ ...BF, padding: '8px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'transparent', color: K, border: `1px solid ${K}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Star size={12} /> I cooked this — leave review</button>
                )}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${LINE}`, textAlign: 'center' }}>
            <Logo size={120} />
            <div style={{ ...BF, fontSize: 11, color: '#7A7A7A', marginTop: 14, lineHeight: 1.6, fontStyle: 'italic' }}>{DISCLAIMER}<br /><br />© Corznaffect</div>
          </div>
        </div>
      </div>
    </div>
  );

  // BUILDER
  const PIcon = PHASES[phase].icon;
  return (
    <div style={page}>
      <style>{SHARED_CSS}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${LINE}` }}>
        <div style={{ ...wrap, padding: '14px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <LogoMark size={36} />
              <div>
                <div style={{ ...BF, fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#7A7A7A', fontWeight: 600 }}>Corznaffect · {code}</div>
                <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.01em', fontStyle: 'italic' }}>Today's Plan</div>
              </div>
            </div>
            <button onClick={() => { if (window.confirm(`Switch from ${PHASES[phase].label}? Your current plan will reset.`)) { setPhase(null); setPlan([]); setGoalsSet(false); } }} style={{ ...BF, padding: '6px 12px', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: K, color: G, border: 'none', borderRadius: 20, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}><PIcon size={11} /> {PHASES[phase].label}</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[['Cal', totals.cal, goals.cal, sCal, ''], ['Protein', totals.p, goals.p, sP, 'g'], ['Carbs', totals.c, goals.c, sC, 'g'], ['Fats', totals.f, goals.f, sF, 'g']].map(([l, v, gg, s, u]) => {
              const pct = Math.min(100, (v / gg) * 100);
              const bc = s === 'on' ? G : s === 'over' ? '#A03020' : s === 'under' ? '#7A7A7A' : '#D4CFBF';
              return (
                <div key={l} style={{ background: '#FFF', padding: '10px 12px', border: `1px solid ${LINE}` }}>
                  <div style={{ ...BF, fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#7A7A7A', marginBottom: 2, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.1 }}>{Math.round(v)}<span style={{ fontSize: 10, color: '#7A7A7A', fontWeight: 400 }}>/{gg}{u}</span></div>
                  <div style={{ height: 3, background: '#F0EBDC', marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: bc, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={wrap}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {CATS.map(c => {
            const Ic = c.i;
            const act = tab === c.id;
            const cnt = plan.filter(p => scaled.find(m => m.id === p.id)?.cat === c.id).reduce((s, p) => s + p.qty, 0);
            return (
              <button key={c.id} onClick={() => setTab(c.id)} style={{ ...BF, flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', fontSize: 12, fontWeight: act ? 700 : 500, letterSpacing: '1.5px', textTransform: 'uppercase', background: act ? K : '#FFF', color: act ? G : K, border: `1px solid ${act ? K : LINE}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Ic size={14} />{c.l}
                {cnt > 0 && <span style={{ background: act ? G : K, color: act ? K : G, fontSize: 10, padding: '1px 7px', borderRadius: 10, fontWeight: 700 }}>{cnt}</span>}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ ...BF, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: '#7A7A7A', fontWeight: 700 }}><Filter size={11} /> Filter</div>
          {DIET.map(f => {
            const a = filters.includes(f.id);
            return <button key={f.id} onClick={() => tFil(f.id)} style={{ ...BF, padding: '6px 14px', fontSize: 11, fontWeight: 600, background: a ? K : 'transparent', color: a ? G : K, border: `1px solid ${a ? K : '#D4CFBF'}`, borderRadius: 20, cursor: 'pointer' }}>{f.l}</button>;
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 24 }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {visible.length === 0 && <div style={{ ...BF, gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', color: '#7A7A7A', background: '#FFF', border: '1px dashed #D4CFBF' }}>No meals match the selected filters.<br />Try removing a filter or switching tabs.</div>}
              {visible.map(m => {
                const q = plan.find(p => p.id === m.id)?.qty || 0;
                return (
                  <div key={m.id} className="mc" style={{ background: '#FFF', border: `1px solid ${LINE}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: 160, overflow: 'hidden', background: '#1a1a1a' }}>
                      <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    </div>
                    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.01em', lineHeight: 1.25, fontStyle: 'italic' }}>{m.name}</h3>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                        {m.tags.filter(t => ['vego', 'gf', 'df'].includes(t)).map(t => <span key={t} style={{ ...BF, fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', padding: '2px 8px', background: BG, color: '#5A5A5A', borderRadius: 20, fontWeight: 600, border: `1px solid ${LINE}` }}>{DIET.find(d => d.id === t)?.l}</span>)}
                      </div>
                      <div style={{ ...BF, fontSize: 12, color: '#5A5A5A', marginBottom: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <span><strong style={{ color: K }}>{m.cal}</strong> cal</span>
                        <span><strong style={{ color: K }}>{m.p}g</strong> P</span>
                        <span><strong style={{ color: K }}>{m.c}g</strong> C</span>
                        <span><strong style={{ color: K }}>{m.f}g</strong> F</span>
                      </div>
                      <div style={{ marginTop: 'auto' }}>
                        {q > 0 ? (
                          <div style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${K}`, overflow: 'hidden' }}>
                            <button onClick={() => sub(m.id)} style={{ background: BG, border: 'none', padding: '7px 10px', cursor: 'pointer', color: K }}><Minus size={13} /></button>
                            <span style={{ ...BF, padding: '0 14px', fontWeight: 700, color: K, fontSize: 13 }}>{q}</span>
                            <button onClick={() => add(m.id)} style={{ background: K, border: 'none', padding: '7px 10px', cursor: 'pointer', color: G }}><Plus size={13} /></button>
                          </div>
                        ) : (
                          <button onClick={() => add(m.id)} style={{ ...BF, padding: '8px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: K, color: G, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Plus size={12} /> Add</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ ...BF, fontSize: 10, color: '#9A9A9A', fontStyle: 'italic', marginTop: 32, lineHeight: 1.5, textAlign: 'center', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>{DISCLAIMER}</p>
          </div>

          <div>
            <div style={{ position: 'sticky', top: 180, background: '#FFF', border: `1px solid ${LINE}`, overflow: 'hidden' }}>
              <div style={{ background: K, color: G, padding: '16px 20px', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
                <div style={{ ...BF, fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: G, opacity: 0.7, marginBottom: 4, fontWeight: 600 }}>Your Plan</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>{plan.reduce((s, p) => s + p.qty, 0)} item{plan.reduce((s, p) => s + p.qty, 0) !== 1 ? 's' : ''}</div>
                  {plan.length > 0 && <button onClick={clr} style={{ ...BF, background: 'transparent', border: 'none', color: G, opacity: 0.7, fontSize: 10, cursor: 'pointer', textDecoration: 'underline' }}>Clear all</button>}
                </div>
              </div>
              <div style={{ padding: '12px 20px', maxHeight: 350, overflowY: 'auto' }}>
                {plan.length === 0 && <div style={{ ...BF, fontSize: 12, color: '#7A7A7A', padding: '24px 0', textAlign: 'center', lineHeight: 1.6 }}>No items yet.<br />Browse the tabs above and tap "Add".</div>}
                {planMeals.map(m => (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #F0EBDC' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...BF, fontSize: 12, fontWeight: 600, color: K, marginBottom: 2 }}>{m.name}{m.qty > 1 && <span style={{ color: G, marginLeft: 6, fontWeight: 700 }}>×{m.qty}</span>}</div>
                      <div style={{ ...BF, fontSize: 10, color: '#7A7A7A' }}>{m.cal * m.qty} cal · {m.p * m.qty}P · {m.c * m.qty}C · {m.f * m.qty}F</div>
                    </div>
                    <button onClick={() => rmAll(m.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#A8A8A8', padding: 2, marginLeft: 8 }}><X size={13} /></button>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px 20px', background: BG, borderTop: `1px solid ${LINE}` }}>
                {plan.length > 0 && !onTrack && (
                  <div style={{ ...BF, fontSize: 11, lineHeight: 1.7, marginBottom: 14, color: '#5A5A5A' }}>
                    <div style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 6 }}>To hit your goals</div>
                    {sCal === 'under' && <div>↑ Need {goals.cal - Math.round(totals.cal)} more cal</div>}
                    {sCal === 'over' && <div>↓ {Math.round(totals.cal) - goals.cal} cal over</div>}
                    {sP === 'under' && <div>↑ Need {goals.p - Math.round(totals.p)}g more protein</div>}
                    {sP === 'over' && <div>↓ {Math.round(totals.p) - goals.p}g protein over</div>}
                    {sC === 'under' && <div>↑ Need {goals.c - Math.round(totals.c)}g more carbs</div>}
                    {sC === 'over' && <div>↓ {Math.round(totals.c) - goals.c}g carbs over</div>}
                    {sF === 'under' && <div>↑ Need {goals.f - Math.round(totals.f)}g more fats</div>}
                    {sF === 'over' && <div>↓ {Math.round(totals.f) - goals.f}g fats over</div>}
                  </div>
                )}
                {onTrack && plan.length > 0 && <div style={{ ...BF, fontSize: 11, color: G, fontWeight: 700, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 5, letterSpacing: '1px', textTransform: 'uppercase' }}><Check size={12} /> All on track</div>}
                <button onClick={finalise} disabled={plan.length === 0} style={{ ...BF, width: '100%', padding: 14, fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: plan.length === 0 ? '#C0C0C0' : G, color: K, border: 'none', cursor: plan.length === 0 ? 'not-allowed' : 'pointer' }}>Create Meal Plan →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Review({ meal, existing, onSubmit, onCancel }) {
  const [r, setR] = useState(existing.rating || 0);
  const [sR, setSR] = useState(existing.setupRating || 0);
  const [tR, setTR] = useState(existing.timeRating || 0);
  const [c, setC] = useState(existing.comment || '');
  const [ph, setPh] = useState(existing.photo || null);
  const handle = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setPh(ev.target.result); r.readAsDataURL(f); };
  const Stars = ({ v, on, l }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ ...BF, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: K, fontWeight: 600, marginBottom: 8 }}>{l}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => on(n)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}><Star size={26} color={G} fill={n <= v ? G : 'none'} strokeWidth={1.5} /></button>)}
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: '100vh', background: BG, ...SF, padding: '40px 20px' }}>
      <style>{SHARED_CSS}</style>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}><Logo size={140} /></div>
        <div style={{ background: '#FFF', border: `1px solid ${LINE}`, padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${G}, transparent)` }} />
          <button onClick={onCancel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#7A7A7A', padding: '4px 0', display: 'inline-flex', alignItems: 'center', gap: 4, ...BF, fontSize: 12, marginBottom: 20 }}><ArrowLeft size={14} /> Back to plan</button>
          <div style={{ ...BF, fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: G, fontWeight: 700, marginBottom: 8 }}>Cooked &amp; Reviewed</div>
          <h1 style={{ fontSize: 30, fontWeight: 400, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.1, fontStyle: 'italic' }}>{meal.name}</h1>
          <p style={{ ...BF, fontSize: 13, color: '#5A5A5A', margin: '0 0 28px', lineHeight: 1.6 }}>Help other clients (and your coach) understand what worked. Reviews may be used as testimonials.</p>
          <Stars v={r} on={setR} l="Overall — how was the meal?" />
          <Stars v={sR} on={setSR} l="Setup &amp; cooking — was it easy?" />
          <Stars v={tR} on={setTR} l="Time-efficient — were instructions clear?" />
          <div style={{ marginBottom: 20 }}>
            <div style={{ ...BF, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: K, fontWeight: 600, marginBottom: 8 }}>Your thoughts</div>
            <textarea value={c} onChange={e => setC(e.target.value)} placeholder="What did you love? Any tweaks you'd make? Would you cook it again?" rows={4} style={{ ...BF, width: '100%', padding: '12px 14px', fontSize: 14, border: '1px solid #D4CFBF', background: BG, resize: 'vertical', lineHeight: 1.5 }} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ ...BF, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: K, fontWeight: 600, marginBottom: 8 }}>Add a photo (optional)</div>
            {ph ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={ph} alt="Your dish" style={{ width: 160, height: 160, objectFit: 'cover', border: '1px solid #D4CFBF' }} />
                <button onClick={() => setPh(null)} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(10,10,10,0.7)', color: G, border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={12} /></button>
              </div>
            ) : (
              <label style={{ ...BF, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', background: BG, color: K, border: `1px dashed ${G}`, cursor: 'pointer' }}>
                <Camera size={14} color={G} /> Upload your dish photo
                <input type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
              </label>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onCancel} style={{ ...BF, flex: 1, padding: 14, fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'transparent', color: K, border: `1px solid ${K}`, cursor: 'pointer' }}>Cancel</button>
            <button onClick={() => onSubmit({ rating: r, setupRating: sR, timeRating: tR, comment: c, photo: ph })} disabled={r === 0} style={{ ...BF, flex: 2, padding: 14, fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', background: r === 0 ? '#C0C0C0' : G, color: K, border: 'none', cursor: r === 0 ? 'not-allowed' : 'pointer' }}>Submit Review</button>
          </div>
          <p style={{ ...BF, fontSize: 11, color: '#7A7A7A', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>By submitting, you agree your review may be shared as a testimonial.</p>
        </div>
      </div>
    </div>
  );
}
