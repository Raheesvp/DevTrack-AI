using MediatR;
using Microsoft.AspNetCore.Identity;
using Saas.Application.Auth;
using Saas.Domain.Entities;

namespace Saas.Application.Commands.Auth;

public class LoginCommand : IRequest<string>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(
        UserManager<ApplicationUser> userManager, 
        IJwtProvider jwtProvider)
    {
        _userManager = userManager;
        _jwtProvider = jwtProvider;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null)
            throw new Exception("Invalid email or password.");
            
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
        
        if (!isPasswordValid)
            throw new Exception("Invalid email or password.");
            
        return _jwtProvider.GenerateToken(user);
    }
}
