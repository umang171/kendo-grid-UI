using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using productAPI.Context;
using productAPI.Model;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace productAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductController : ControllerBase
  {
    ProductDbContext _productDbContext;
    public ProductController(ProductDbContext productDbContext)
    {
      _productDbContext = productDbContext;
    }

    [HttpGet("getProducts")]
    public async Task<IActionResult> getProducts(int ?pageSkip,int ?pageSize,string ?searchText,string ?orderBy,string ?dir)
    {
      JsonSerializerOptions options = new()
      {
        ReferenceHandler = ReferenceHandler.IgnoreCycles,
        WriteIndented = true
      };
      string productStr;
      if (string.IsNullOrEmpty(searchText))
      {
        productStr = System.Text.Json.JsonSerializer.Serialize(_productDbContext.Products.Include(product => product.Category).ToList(), options);
      }
      else
      {
        productStr = System.Text.Json.JsonSerializer.Serialize(_productDbContext.Products.Where(product=>product.ProductName.Contains(searchText)).Include(product => product.Category).ToList(), options);
      }

      List<Product> products = JsonConvert.DeserializeObject<List<Product>>(productStr);
      int total = products.Count();
      if (dir!="desc")
      {
        if(orderBy=="productName")
          products = products.OrderBy(product=>product.ProductName).Skip((int)pageSkip).Take((int)pageSize).ToList();
        else if(orderBy=="price")
          products = products.OrderBy(product=>product.Price).Skip((int)pageSkip).Take((int)pageSize).ToList();
        else
          products = products.Skip((int)pageSkip).Take((int)pageSize).ToList();
      }
      else
      {
        if (orderBy == "productName")
          products = products.OrderByDescending(product => product.ProductName).Skip((int)pageSkip).Take((int)pageSize).ToList();
        else if (orderBy == "price")
          products = products.OrderByDescending(product => product.Price).Skip((int)pageSkip).Take((int)pageSize).ToList();
        else
          products = products.Skip((int)pageSkip).Take((int)pageSize).ToList();
      }
      return Ok(new {products,total});
    }
    [HttpGet("getCategories")]
    public async Task<IActionResult> getCategories()
    {
      return Ok(_productDbContext.Categories.ToList());
    }
    [HttpPost("addProduct")]
    public async Task<IActionResult> addProduct([FromBody] Product product)
    {
      if (product == null)
        return BadRequest();
      await _productDbContext.AddAsync(product);
      await _productDbContext.SaveChangesAsync();

      return Ok(new {Message = "Product added Successfully"});
    }
  }
}
