package com.example.ecommerce.product;

import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ProductSpecs {
    public static Specification<Product> q(String q) {
        if (q == null || q.isBlank()) return null;
        String like = "%" + q.trim().toLowerCase() + "%";
        return (root, cq, cb) -> cb.or(
                cb.like(cb.lower(root.get("name")), like),
                cb.like(cb.lower(root.get("description")), like),
                cb.like(cb.lower(root.get("sku")), like)
        );
    }

    public static Specification<Product> category(String category) {
        if (category == null || category.isBlank()) return null;
        return (root, cq, cb) -> cb.equal(cb.lower(root.get("category")), category.toLowerCase());
    }

    public static Specification<Product> minPrice(BigDecimal min) {
        if (min == null) return null;
        return (root, cq, cb) -> cb.greaterThanOrEqualTo(root.get("price"), min);
    }

    public static Specification<Product> maxPrice(BigDecimal max) {
        if (max == null) return null;
        return (root, cq, cb) -> cb.lessThanOrEqualTo(root.get("price"), max);
    }
}