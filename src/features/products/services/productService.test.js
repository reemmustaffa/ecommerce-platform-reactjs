import { describe, it, expect, vi } from 'vitest';
import {
    getProducts,
    getProductById,
    getProductsByIds,
    getCategories,
    getReviewsByProductId,
    filterProducts
} from './productService';

// Mock the data imports to ensure consistent tests
vi.mock('../../../data/products', () => ({
    default: [
        { id: 1, title: 'Product 1', category: 'Electronics', price: 100, rating: 4.5, description: 'Description 1' },
        { id: 2, title: 'Product 2', category: 'Fashion', price: 50, rating: 4.0, description: 'Description 2' },
        { id: 3, title: 'Product 3', category: 'Electronics', price: 150, rating: 4.8, description: 'Description 3' },
    ]
}));

vi.mock('../../../data/reviews', () => ({
    default: [
        { id: 1, productId: 1, comment: 'Great product' },
        { id: 2, productId: 1, comment: 'Excellent' },
        { id: 3, productId: 2, comment: 'Nice' },
    ]
}));

describe('productService', () => {
    describe('getProducts', () => {
        it('should return all products', async () => {
            const products = await getProducts();
            expect(products).toHaveLength(3);
            expect(products[0].title).toBe('Product 1');
        });
    });

    describe('getProductById', () => {
        it('should return the correct product when ID exists', async () => {
            const product = await getProductById(1);
            expect(product.title).toBe('Product 1');
        });

        it('should return null when ID does not exist', async () => {
            const product = await getProductById(999);
            expect(product).toBeNull();
        });

        it('should handle numeric string IDs', async () => {
            const product = await getProductById('2');
            expect(product.title).toBe('Product 2');
        });
    });

    describe('getProductsByIds', () => {
        it('should return products matching the provided IDs', async () => {
            const products = await getProductsByIds([1, 3]);
            expect(products).toHaveLength(2);
            expect(products.map(p => p.id)).toContain(1);
            expect(products.map(p => p.id)).toContain(3);
        });

        it('should return empty array when no IDs match', async () => {
            const products = await getProductsByIds([999]);
            expect(products).toHaveLength(0);
        });
    });

    describe('getCategories', () => {
        it('should return unique categories', async () => {
            const categories = await getCategories();
            expect(categories).toHaveLength(2);
            expect(categories).toContain('Electronics');
            expect(categories).toContain('Fashion');
        });
    });

    describe('getReviewsByProductId', () => {
        it('should return correct reviews for a product', async () => {
            const reviews = await getReviewsByProductId(1);
            expect(reviews).toHaveLength(2);
            expect(reviews[0].comment).toBe('Great product');
        });

        it('should return empty array if no reviews exist for product', async () => {
            const reviews = await getReviewsByProductId(3);
            expect(reviews).toHaveLength(0);
        });
    });

    describe('filterProducts', () => {
        it('should filter by search term in title', async () => {
            const result = await filterProducts({ search: 'Product 1' });
            expect(result.data).toHaveLength(1);
            expect(result.data[0].id).toBe(1);
        });

        it('should filter by search term in description', async () => {
            const result = await filterProducts({ search: 'Description 2' });
            expect(result.data).toHaveLength(1);
            expect(result.data[0].id).toBe(2);
        });

        it('should filter by category', async () => {
            const result = await filterProducts({ category: 'Electronics' });
            expect(result.data).toHaveLength(2);
        });

        it('should filter by price range', async () => {
            const result = await filterProducts({ minPrice: 60, maxPrice: 160 });
            expect(result.data).toHaveLength(2);
            expect(result.data.map(p => p.id)).toContain(1);
            expect(result.data.map(p => p.id)).toContain(3);
        });

        it('should sort by price asc', async () => {
            const result = await filterProducts({ sortBy: 'price', sortOrder: 'asc' });
            expect(result.data[0].price).toBe(50);
            expect(result.data[2].price).toBe(150);
        });

        it('should sort by rating desc', async () => {
            const result = await filterProducts({ sortBy: 'rating', sortOrder: 'desc' });
            expect(result.data[0].rating).toBe(4.8);
        });

        it('should handle pagination', async () => {
            const result = await filterProducts({ page: 1, limit: 2 });
            expect(result.data).toHaveLength(2);
            expect(result.totalPages).toBe(2);
            expect(result.total).toBe(3);
        });
    });
});
