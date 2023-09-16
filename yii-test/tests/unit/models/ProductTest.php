<?php

namespace tests\unit\models;

use app\models\Product;
use yii\validators\ValidationException;

class ProductTest extends \Codeception\Test\Unit
{
    public function testSaveProduct()
    {
        $product = new Product();
        $product->name = 'Test Product';
        $product->description = 'This is a test product.';
        $product->price = 10.99;

        $this->assertTrue($product->save());

        $savedProduct = Product::findOne(['name' => 'Test Product']);
        $this->assertEquals('This is a test product.', $savedProduct->description);
        $this->assertEquals(10.99, $savedProduct->price);
    }

    public function testRequiredFields()
    {
        $product = new Product();

        $this->expectException(ValidationException::class);
        $product->save();
    }

    public function testDeleteProduct()
    {
        // Create a new product and save it
        $product = new Product();
        $product->name = 'Test Product';
        $product->description = 'This is a test product.';
        $product->price = 10.99;
        $product->save();

        // Delete the product
        $this->assertTrue($product->delete());

        // Ensure the product is deleted from the database
        $deletedProduct = Product::findOne(['name' => 'Test Product']);
        $this->assertNull($deletedProduct);
    }
}