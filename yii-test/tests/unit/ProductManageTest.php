<?php

use app\models\Product;
use yii\validators\ValidationException;
class ProductManageTest extends \Codeception\Test\Unit
{
    /**
     * @var \UnitTester
     */
    protected $tester;
    
    protected function _before()
    {
    }

    protected function _after()
    {
    }

    // tests
    public function testSaveProduct()
    {
        $product = new Product();
        $product->name = 'Test Product';
        $product->description = 'This is a test product.';
        $product->price = 9.99;

        // Act
        $saved = $product->save();

        // Assert
        $this->assertTrue($saved);
        $this->assertNotNull($product->id);
        $this->assertEquals('Test Product', $product->name);
        $this->assertEquals(9.99, $product->price);
    }

    public function testDeleteProduct()
    {
        // Create a new product and save it
        $product = new Product();
        $product->name = 'Test Product';
        $product->description = 'This is a test product.';
        $product->price = 10.99;
        $product->save();

        // Act
        $deleted = $product->delete();

        // Assert
        $this->assertEquals(1, $deleted);
        $this->assertNull(Product::findOne($product->id));
    }

}