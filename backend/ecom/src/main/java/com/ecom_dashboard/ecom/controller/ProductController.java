package com.ecom_dashboard.ecom.controller;

import com.ecom_dashboard.ecom.dto.ProductRequest;
import com.ecom_dashboard.ecom.dto.ProductResponse;
import com.ecom_dashboard.ecom.service.ProductServiceImp;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductController {
    private final ProductServiceImp productService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest productRequest){
        return ResponseEntity.ok(productService.createProduct(productRequest));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,@RequestBody ProductRequest productRequest){
        return ResponseEntity.ok(productService.updateProduct(id,productRequest));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Deleted Successfully");
        }
        catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

}
