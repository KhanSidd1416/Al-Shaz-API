import Category from '../models/Category.js';

export const addCategories = async () => {
    const categories = [
        { name: "Books", description: "Islamic books including Quran, Hadith, etc." },
        { name: "Prayer Mats", description: "Jani Namaz, prayer essentials" },
        { name: "Perfumes", description: "Ithar and Islamic fragrances" },
        { name: "Thazbee", description: "Islamic prayer beads for dhikr" },
        { name: "Thobes", description: "Traditional Islamic clothing for men" },
        { name: "Prayer Caps", description: "Caps worn during prayers" },
        { name: "Zam-Zam Water", description: "Holy water from Mecca" },
        { name: "Harams", description: "Items related to the sacred mosque in Mecca" },
        { name: "Socks", description: "Islamic socks for prayers" },
        { name: "Other Gift Items", description: "Miscellaneous Islamic gift items" },
      ];
  await Category.insertMany(categories);
  return { message: "Categories added successfully!" };
};

export const getCategories = async () => {
  return await Category.find();
};
