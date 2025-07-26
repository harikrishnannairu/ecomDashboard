package com.ecom_dashboard.ecom.service;

import com.ecom_dashboard.ecom.dto.ProductRequest;
import com.ecom_dashboard.ecom.dto.ProductResponse;
import com.ecom_dashboard.ecom.entity.Product;
import com.ecom_dashboard.ecom.entity.User;
import com.ecom_dashboard.ecom.repository.ProductRepository;
import com.ecom_dashboard.ecom.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductServiceImp {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductResponse createProduct(ProductRequest productRequest){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()-> new EntityNotFoundException("user doesnot eist"));
        Product product= Product.builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .description(productRequest.getDescription())
                .quantity(productRequest.getQuantity())
                .createdBy(user)
                .build();
        productRepository.save(product);
        return mapToResponse(product);
    }
    public List<ProductResponse> getAllProducts(){
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Long id){
        Product product=productRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Product not found"));
        return mapToResponse(product);
    }

    public ProductResponse updateProduct(Long id,ProductRequest productRequest){
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Product not found"));
        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setQuantity(productRequest.getQuantity());
        productRepository.save(product);
        return mapToResponse(product);
    }
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductResponse mapToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .quantity(product.getQuantity())
                .createdBy(product.getCreatedBy().getEmail())
                .build();
    }
}
