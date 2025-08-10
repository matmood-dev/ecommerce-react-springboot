package com.example.ecommerce.product;

import com.example.ecommerce.product.dto.ProductRequest;
import com.example.ecommerce.product.dto.ProductResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import static com.example.ecommerce.product.ProductSpecs.*;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public ProductResponse create(ProductRequest req) {
        // guard unique SKU (nice error before DB blows up)
        repo.findBySku(req.sku()).ifPresent(p -> {
            throw new DataIntegrityViolationException("SKU already exists");
        });

        Product p = map(req, new Product());
        return toResponse(repo.save(p));
    }

    public ProductResponse get(Long id) {
        return repo.findById(id).map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public Page<ProductResponse> list(String q, String category,
                                      BigDecimal minPrice, BigDecimal maxPrice,
                                      Pageable pageable) {
        Specification<Product> spec = Specification.where(q(q))
                .and(category(category))
                .and(minPrice(minPrice))
                .and(maxPrice(maxPrice));

        return repo.findAll(spec, pageable).map(this::toResponse);
    }

    public ProductResponse update(Long id, ProductRequest req) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        // handle unique sku on update
        repo.findBySku(req.sku()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new DataIntegrityViolationException("SKU already exists");
            }
        });

        map(req, p);
        return toResponse(repo.save(p));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new IllegalArgumentException("Product not found");
        repo.deleteById(id);
    }

    private Product map(ProductRequest req, Product p) {
        p.setSku(req.sku());
        p.setName(req.name());
        p.setDescription(req.description());
        p.setCategory(req.category());
        p.setPrice(req.price());
        p.setStock(req.stock());
        p.getImageUrls().clear();
        if (req.imageUrls() != null) p.getImageUrls().addAll(req.imageUrls());
        return p;
    }

    private ProductResponse toResponse(Product p) {
        return new ProductResponse(
                p.getId(), p.getSku(), p.getName(), p.getDescription(),
                p.getCategory(), p.getPrice(), p.getStock(),
                p.getImageUrls(), p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}